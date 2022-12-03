import { Col, Row, ListGroup, Image, Button, Form } from "react-bootstrap";

const CartItemComponent = () => {
  return (
    <div>
      <ListGroup.Item>
        <Row>
          <Col md={2}>
            <Image crossOrigin="anonymous" fluid src="images/card/card.png" />
          </Col>
          <Col md={2}>
            Technology updates
            <br />
            Gaming laptop
          </Col>
          <Col md={2}>
            Price: <b>$453</b>
          </Col>
          <Col md={3}>
            <Form.Select>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </Form.Select>
          </Col>
          <Col md={3}>
            <Button
              type="button"
              variant="secondary"
              onClick={() => window.confirm("Are you sure?")}
            >
              <i className="bi bi-trash"></i>
            </Button>
          </Col>
        </Row>
      </ListGroup.Item>
    </div>
  );
};

export default CartItemComponent;
