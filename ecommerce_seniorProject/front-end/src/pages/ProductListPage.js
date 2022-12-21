import ListGroup from "react-bootstrap/ListGroup";
import { Row, Container, Col, Button } from "react-bootstrap";
import SortOptionsComponent from "../components/SortOptionsComponent";
import PriceFilterComponent from "../components/PriceFilterComponent";
import RatingFilterComponent from "../components/RatingFilterComponent";
import CategoryFilterComponent from "../components/CategoryFilterComponent";
import AttributesFilterComponent from "../components/AttributesFilterComponent";
import ProductForListComponent from "../components/ProductForListComponent";
import PaginationComponent from "../components/PaginationComponent";

const ProductListPage = () => {
  return (
    <Container fluid>
      <Row>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item className="mb-3 mt-3">
              <SortOptionsComponent />
            </ListGroup.Item>
            <ListGroup.Item>
              <span className="fw-bold">FILTER: </span> <br />
              <PriceFilterComponent />
            </ListGroup.Item>
            <ListGroup.Item>
              <RatingFilterComponent />
            </ListGroup.Item>
            <ListGroup.Item>
              <span className="fw-bold">Category: </span> <br />
              <CategoryFilterComponent />
            </ListGroup.Item>
            <ListGroup.Item>
              <AttributesFilterComponent />
            </ListGroup.Item>
            <ListGroup.Item>
              <Button variant="primary">Filter</Button>
              <Button variant="danger">Reset</Button>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={9}>
          {Array.from({ length: 5 }).map((_, id) => {
            return (
              <ProductForListComponent
                key={id}
                id={id}
                images={["books", "cameras", "games", "monitors", "printers"]}
              />
            );
          })}
          <PaginationComponent />
        </Col>
      </Row>
    </Container>
  );
};

export default ProductListPage;
