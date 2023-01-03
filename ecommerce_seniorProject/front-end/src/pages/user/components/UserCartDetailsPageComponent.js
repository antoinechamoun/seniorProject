import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  ListGroup,
  Row,
} from "react-bootstrap";
import CartItemComponent from "../../../components/CartItemComponent";
import { useNavigate } from "react-router-dom";

const UserCartDetailsPageComponent = ({
  userInfo,
  getUser,
  cartItems,
  itemsCount,
  cartSubtotal,
  reduxDispatch,
  addToCart,
  removeFromCart,
  createOrder,
}) => {
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [userAddress, setUserAddress] = useState(false);
  const [missingAddress, setMissingAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("pp");

  const navigate = useNavigate();

  const changeCount = (productId, count) => {
    reduxDispatch(addToCart(productId, count));
  };

  const removeFromCartHandler = (productId, quantity, price) => {
    if (window.confirm("Are you sure?")) {
      reduxDispatch(removeFromCart(productId, quantity, price));
    }
  };

  useEffect(() => {
    getUser()
      .then((res) => {
        if (
          !res.address ||
          !res.city ||
          !res.country ||
          !res.zipCode ||
          !res.state ||
          !res.phoneNumber
        ) {
          setButtonDisabled(true);
          setMissingAddress(
            " In order to make order, fill out your profile with correct address, city..."
          );
        } else {
          setUserAddress({
            address: res.address,
            city: res.city,
            country: res.country,
            zipCode: res.zipCode,
            state: res.state,
            phoneNumber: res.phoneNumber,
          });
        }
      })
      .catch((er) =>
        console.log(
          er.response.data.message ? er.response.data.message : er.response.data
        )
      );
    // eslint-disable-next-line
  }, [userInfo.id]);

  const orderHandler = () => {
    const orderData = {
      orderTotal: {
        itemsCount: itemsCount,
        cartSubtotal: cartSubtotal,
      },
      cartItems: cartItems.map((item) => {
        return {
          productId: item.productId,
          name: item.name,
          price: item.price,
          image: { path: item.image ? item.image.path ?? null : null },
          quantity: item.quantity,
          count: item.count,
        };
      }),
      paymentMethod: paymentMethod,
    };
    createOrder(orderData)
      .then((res) => {
        if (res) {
          navigate("/user/order-details/" + res._id);
        }
      })
      .catch((er) => console.log(er));
  };

  const choosePayment = (e) => {
    setPaymentMethod(e.target.value);
  };

  return (
    <Container fluid>
      <Row className="mt-4">
        <h1>Cart Details</h1>
        <Col md={8} className="mt-5">
          <Row>
            <Col md={6}>
              <h3>Shipping</h3>
              <b>Name</b>: {userInfo.name} {userInfo.lastName}
              <br />
              <b>Address</b>: {userAddress.address} {userAddress.city}{" "}
              {userAddress.state} {userAddress.zipCode}
              <br />
              <b>Phone</b>: {userAddress.phoneNumber} <br />
            </Col>
            <Col md={6}>
              <h2>Payment method</h2>
              <Form.Select onChange={choosePayment}>
                <option value="pp">PayPal</option>
                <option value="cod">
                  Cash On Delivery(delivery may be delayed)
                </option>
              </Form.Select>
            </Col>
            <Row>
              <Col>
                <Alert className="mt-3" variant="danger">
                  Not delivered!
                  {missingAddress}
                </Alert>
              </Col>
              <Col>
                <Alert className="mt-3" variant="success">
                  Not paid yet
                </Alert>
              </Col>
            </Row>
          </Row>
          <br />
          <h3>Order items</h3>
          <ListGroup>
            {cartItems.map((item, id) => {
              return (
                <CartItemComponent
                  item={item}
                  key={id}
                  removeFromCartHandler={removeFromCartHandler}
                  changeCount={changeCount}
                />
              );
            })}
          </ListGroup>
        </Col>
        <Col md={4} className="mt-5">
          <ListGroup>
            <ListGroup.Item>
              <h3>Order summary</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              Items price (after tax):{" "}
              <span className="fw-bold">${cartSubtotal}</span>
            </ListGroup.Item>
            <ListGroup.Item>
              Shipping: <span className="fw-bold">included</span>
            </ListGroup.Item>
            <ListGroup.Item>
              Tax: <span className="fw-bold">included</span>
            </ListGroup.Item>
            <ListGroup.Item className="text-danger">
              Total price: <span className="fw-bold">${cartSubtotal}</span>
            </ListGroup.Item>
            <ListGroup.Item>
              <div className="d-grid gap-2">
                <Button
                  size="lg"
                  variant="danger"
                  type="button"
                  disabled={buttonDisabled}
                  onClick={orderHandler}
                >
                  Place order
                </Button>
              </div>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default UserCartDetailsPageComponent;
