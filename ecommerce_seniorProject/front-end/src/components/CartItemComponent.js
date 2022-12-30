import { Col, Row, ListGroup, Image, Form } from "react-bootstrap";
import RemoveFromCartComponent from "../pages/components/RemoveFromCartComponent";

const CartItemComponent = ({
  item,
  removeFromCartHandler = false,
  orderCreated = false,
  changeCount = false,
}) => {
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
              onChange={
                changeCount
                  ? (e) => changeCount(item.productId, e.target.value)
                  : undefined
              }
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
            <RemoveFromCartComponent
              orderCreated={orderCreated}
              productId={item.productId}
              quantity={item.quantity}
              price={item.price}
              removeFromCartHandler={
                removeFromCartHandler ? removeFromCartHandler : undefined
              }
            />
          </Col>
        </Row>
      </ListGroup.Item>
    </div>
  );
};

export default CartItemComponent;
