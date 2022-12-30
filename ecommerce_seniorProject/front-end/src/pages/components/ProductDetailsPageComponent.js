import {
  Col,
  Row,
  Container,
  Image,
  Alert,
  ListGroup,
  Form,
  Button,
} from "react-bootstrap";
import AddedToCartMessageComponent from "../../components/AddedToCartMessageComponent";
import { Rating } from "react-simple-star-rating";
import { useEffect, useState } from "react";
import ImageZoom from "js-image-zoom";

import { useParams } from "react-router-dom";

const ProductDetailsPageComponent = ({
  addToCartReduxAction,
  reduxDispatch,
}) => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [showCartMessage, setShowCartMessage] = useState(false);

  const addToCartHandler = () => {
    reduxDispatch(addToCartReduxAction(id, quantity));
    setShowCartMessage(true);
  };

  let options = {
    scale: 2,
    offset: { vertical: 0, horizontal: 0 },
  };
  useEffect(() => {
    new ImageZoom(document.getElementById("first"), options);
    new ImageZoom(document.getElementById("second"), options);
    new ImageZoom(document.getElementById("third"), options);
    new ImageZoom(document.getElementById("fourth"), options);
    // eslint-disable-next-line
  }, []);
  return (
    <Container>
      <AddedToCartMessageComponent
        showCartMessage={showCartMessage}
        setShowCartMessage={setShowCartMessage}
      />
      <Row className="mt-5">
        <Col style={{ zIndex: 1 }} md={4}>
          <div id="first">
            <Image fluid src="/images/categories/cameras.png" />
          </div>
          <br />
          <div id="second">
            <Image fluid src="/images/categories/monitors.png" />
          </div>
          <br />
          <div id="third">
            <Image fluid src="/images/categories/books.png" />
          </div>
          <br />
          <div id="fourth">
            <Image fluid src="/images/categories/games.png" />
          </div>
          <br />
        </Col>
        <Col md={8}>
          <Row>
            <Col md={8}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h1>Product name</h1>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating readonly size={20} initialValue={5} />
                  (1)
                </ListGroup.Item>
                <ListGroup.Item>Price</ListGroup.Item>
                <ListGroup.Item>$450</ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={4}>
              <ListGroup>
                <ListGroup.Item>Status in stock</ListGroup.Item>
                <ListGroup.Item>
                  Price: <span className="fw-bold">$345</span>
                </ListGroup.Item>
                <ListGroup.Item>
                  Quantity
                  <Form.Select
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    size="lg"
                    aria-label="default select "
                  >
                    <option disabled>Select</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </Form.Select>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button variant="danger" onClick={addToCartHandler}>
                    Add to cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
          <Row>
            <Col className="mt-5">
              <h5>Reviews</h5>
              <ListGroup variant="flush">
                {Array.from({ length: 10 }).map((item, id) => {
                  return (
                    <ListGroup.Item key={id}>
                      UserName
                      <br />
                      <Rating readonly size={20} initialValue={4} />
                      <br />
                      20-09-2001
                      <br />
                      lore,mfd klsdjkglshdljh hjgbsdk khasgfladfs
                    </ListGroup.Item>
                  );
                })}
              </ListGroup>
            </Col>
          </Row>
          <hr />
          Send review form
          <Alert variant="danger">Login first to write</Alert>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="name@example.com" />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Example textarea</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
            <Form.Select aria-label="Default select example">
              <option>Your rating</option>
              <option value="5">5 (very good)</option>
              <option value="4">4 (good)</option>
              <option value="3">3 (average)</option>
              <option value="2">2 (bad)</option>
              <option value="1">1 (awful)</option>
            </Form.Select>
            <Button variant="primary" className="mb-3 mt-3">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetailsPageComponent;
