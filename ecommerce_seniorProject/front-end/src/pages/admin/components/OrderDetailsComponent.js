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
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

import { logout } from "../../../redux/actions/userActions";
import { useDispatch } from "react-redux";

const OrderDetailsPageComponent = ({ getOrderDetails, markAsDelivered }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [userInfo, setUserInfo] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState([]);
  const [isPaid, setIsPaid] = useState(false);
  const [isDelivered, setIsDelivered] = useState(false);
  const [cartSubtotal, setCartSubtotal] = useState(0);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [orderButtonMessage, setOrderButtonMessage] =
    useState("Mark as delivered");
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    getOrderDetails(id)
      .then((res) => {
        setUserInfo(res.user);
        setPaymentMethod(res.paymentMethod);
        res.isPaid ? setIsPaid(res.paidAt) : setIsPaid(false);
        res.isDelivered
          ? setIsDelivered(res.deliveredAt)
          : setIsDelivered(false);
        setCartSubtotal(res.orderTotal.cartSubtotal);
        if (res.isDelivered) {
          setOrderButtonMessage("Order is finished");
          setButtonDisabled(true);
        }
        setCartItems(res.cartItems);
      })
      .catch((er) => {
        dispatch(logout());
      });
    // eslint-disable-next-line
  }, [isDelivered, id]);

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
              <b>Address</b>:{userInfo.address} {userInfo.city} {userInfo.state}{" "}
              {userInfo.zipCode}
              <br />
              <b>Phone</b>: {userInfo.phoneNumber} <br />
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
                    <>Delivered at {isDelivered}</>
                  ) : (
                    <>Not delivered</>
                  )}
                </Alert>
              </Col>
              <Col>
                <Alert className="mt-3" variant={isPaid ? "success" : "danger"}>
                  {isPaid ? <>Paid at {isPaid}</> : <>Not paid yet</>}
                </Alert>
              </Col>
            </Row>
          </Row>
          <br />
          <h3>Order items</h3>
          <ListGroup>
            {cartItems.map((item, id) => {
              return (
                <CartItemComponent key={id} item={item} orderCreated={true} />
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
              <span className="fw-bold">{cartSubtotal}</span>
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
                  onClick={() => {
                    markAsDelivered(id)
                      .then((res) => {
                        if (res) {
                          setIsDelivered(true);
                        }
                      })
                      .catch((er) => {
                        console.log(
                          er.response.data.message
                            ? er.response.data.message
                            : er.response.data
                        );
                      });
                  }}
                >
                  {orderButtonMessage}
                </Button>
              </div>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default OrderDetailsPageComponent;
