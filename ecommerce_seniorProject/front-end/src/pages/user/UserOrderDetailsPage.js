import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  ListGroup,
  Row,
} from "react-bootstrap";
import CartItemComponent from "../../components/CartItemComponent";
const UserOrderDetailsPage = () => {
  return (
    <Container fluid>
      <Row className="mt-4">
        <h1>Order Details</h1>
        <Col md={8} className="mt-5">
          <Row>
            <Col md={6}>
              <h3>Shipping</h3>
              <b>Name</b>: Mark khoury
              <br />
              <b>Address</b>: 87324 Jounieh, kaslik , 0000
              <br />
              <b>Phone</b>: 96176276372 <br />
            </Col>
            <Col md={6}>
              <h2>Payment method</h2>
              <Form.Select disabled={false}>
                <option value="pp">PayPal</option>
                <option value="cod">
                  Cash On Delivery(delivery may be delayed)
                </option>
              </Form.Select>
            </Col>
            <Row>
              <Col>
                <Alert className="mt-3" variant="danger">
                  Not delivered
                </Alert>
              </Col>
              <Col>
                <Alert className="mt-3" variant="success">
                  Paid on 2022-12-2
                </Alert>
              </Col>
            </Row>
          </Row>
          <br />
          <h3>Order items</h3>
          <ListGroup>
            {Array.from({ length: 3 }).map((_, id) => {
              return (
                <CartItemComponent
                  item={{
                    image: { path: "/images/card/card.png" },
                    name: "product",
                    price: 10,
                    count: 10,
                    quantity: 10,
                  }}
                  key={id}
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
              Items price (after tax): <span className="fw-bold">$892</span>
            </ListGroup.Item>
            <ListGroup.Item>
              Shipping: <span className="fw-bold">included</span>
            </ListGroup.Item>
            <ListGroup.Item>
              Tax: <span className="fw-bold">included</span>
            </ListGroup.Item>
            <ListGroup.Item className="text-danger">
              Total price: <span className="fw-bold">$904</span>
            </ListGroup.Item>
            <ListGroup.Item>
              <div className="d-grid gap-2">
                <Button size="lg" variant="danger" type="button">
                  Pay for the order
                </Button>
              </div>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default UserOrderDetailsPage;
