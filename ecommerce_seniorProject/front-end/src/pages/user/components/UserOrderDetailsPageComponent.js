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
import { useParams } from "react-router-dom";
import axios from "axios";
import CartItemComponent from "../../../components/CartItemComponent";
const UserOrderDetailsPageComponent = ({
  userInfo,
  getUser,
  getOrder,
  loadScript,
}) => {
  const [userAddress, setUserAddress] = useState({});
  const [paymentMethod, setPaymentMethod] = useState("");
  const [isPaid, setIsPaid] = useState(false);
  const [orderButtonMessage, setOrderButtonMessage] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [cartSubtotal, setCartSubtotal] = useState(0);
  const [isDelivered, setIsDelivered] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    try {
      getUser().then((res) => {
        setUserAddress({
          address: res.address,
          city: res.city,
          country: res.country,
          zipCode: res.zipCode,
          state: res.state,
          phoneNumber: res.phoneNumber,
        });
      });
    } catch (error) {
      console.log(error);
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    try {
      getOrder(id).then((res) => {
        setPaymentMethod(res.paymentMethod);
        setCartItems(res.cartItems);
        setCartSubtotal(res.orderTotal.cartSubtotal);
        res.isDelivered
          ? setIsDelivered(res.deliveredAt)
          : setIsDelivered(false);
        res.isPaid ? setIsPaid(res.paidAt) : setIsPaid(false);

        if (res.isPaid) {
          setButtonDisabled(true);
          setOrderButtonMessage("Your order is finished");
        } else if (res.paymentMethod === "pp") {
          setOrderButtonMessage("Pay for your order");
        } else if (res.paymentMethod === "cod") {
          setButtonDisabled(true);
          setOrderButtonMessage("Wait for your order. You pay on delivery");
        }
      });
    } catch (error) {
      console.log(error);
    }
    // eslint-disable-next-line
  }, []);

  const updateOrder = async (orderId) => {
    const { data } = await axios.put("/api/orders/paid" + orderId);
    return data;
  };

  const orderHandler = () => {
    setButtonDisabled(true);
    if (paymentMethod === "pp") {
      setOrderButtonMessage(
        "To pay for your order click one of the buttons below"
      );
      if (!isPaid) {
        loadScript({
          "client-id":
            "AbhlMqTdbfjdew9p1RaZnfTCSPA1orXZQr2xSmnVK1xUK34S9pfOqk4SbY-QUINkdnn7DpjtXRBviaZj",
        })
          .then((paypal) => {
            paypal
              .Buttons({
                createOrder: function (data, actions) {
                  return actions.order.create({
                    purchase_units: [
                      {
                        amount: {
                          value: cartSubtotal,
                          breakdown: {
                            currency_code: "USD",
                            value: cartSubtotal,
                          },
                        },
                        items: cartItems.map((product) => {
                          return {
                            name: product.name,
                            unit_amount: {
                              currency_code: "USD",
                              value: product.price,
                            },
                            quantity: product.quantity,
                          };
                        }),
                      },
                    ],
                  });
                },
                onApprove: function (data, actions) {
                  return actions.order.capture().then((orderData) => {
                    let transaction =
                      orderData.purchase_units[0].payments.captures[0];
                    if (
                      transaction.status === "COMPLETED" &&
                      Number(transaction.amount.value) === Number(cartSubtotal)
                    ) {
                      updateOrder(id).then((data) => {
                        if (data.isPaid) {
                          setOrderButtonMessage("Thank you for your payment!");
                          setIsPaid(data.paidAt);
                          setButtonDisabled(true);
                        }
                      });
                    }
                  });
                },
              })
              .render("#paypal-container-element");
          })
          .catch((er) => console.log(er));
      }
    } else {
      setOrderButtonMessage("Your order was placed. Thank you");
    }
  };

  return (
    <Container fluid>
      <Row className="mt-4">
        <h1>Order Details</h1>
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
              <Form.Select value={paymentMethod} disabled={true}>
                <option value="pp">PayPal</option>
                <option value="cod">
                  Cash On Delivery(delivery may be delayed)
                </option>
              </Form.Select>
            </Col>
            <Row>
              <Col>
                <Alert
                  className="mt-3"
                  variant={isDelivered ? "success" : "danger"}
                >
                  {isDelivered ? (
                    <>Delivered at {isDelivered} </>
                  ) : (
                    "Not delivered"
                  )}
                </Alert>
              </Col>
              <Col>
                <Alert className="mt-3" variant={isPaid ? "success" : "danger"}>
                  {isPaid ? <>Paid at {isPaid} </> : "Not paid yet"}
                </Alert>
              </Col>
            </Row>
          </Row>
          <br />
          <h3>Order items</h3>
          <ListGroup>
            {cartItems.map((item, id) => {
              return (
                <CartItemComponent item={item} key={id} orderCreated={true} />
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
                  onClick={orderHandler}
                  disabled={buttonDisabled}
                >
                  {orderButtonMessage}
                </Button>
              </div>
              <div id="paypal-container-element"></div>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default UserOrderDetailsPageComponent;
