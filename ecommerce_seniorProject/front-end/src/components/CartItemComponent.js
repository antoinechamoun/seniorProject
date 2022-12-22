import { Col, Row, ListGroup, Image, Button, Form } from "react-bootstrap";

const CartItemComponent = ({ item, orderCreated = false }) => {
  return (
    <div>
      <ListGroup.Item>
        <Row>
          <Col md={2}>
            <Image
              crossOrigin="anonymous"
              fluid
              src={item.image ? item.image.path ?? null : null}
            />
          </Col>
          <Col md={2}>
            {item.name}
            <br />
          </Col>
          <Col md={2}>
            <b>$ {item.price}</b>
          </Col>
          <Col md={3}>
            <Form.Select
              onChange={() => {}}
              disabled={orderCreated}
              value={item.quantity}
            >
              {[...Array(item.count).keys()].map((x, idx) => {
                return (
                  <option value={x + 1} key={idx}>
                    {x + 1}
                  </option>
                );
              })}
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
