import ListGroup from "react-bootstrap/ListGroup";
import { Row, Container, Col, Button } from "react-bootstrap";
import SortOptionsComponent from "../../components/SortOptionsComponent";
import PriceFilterComponent from "../../components/PriceFilterComponent";
import RatingFilterComponent from "../../components/RatingFilterComponent";
import CategoryFilterComponent from "../../components/CategoryFilterComponent";
import AttributesFilterComponent from "../../components/AttributesFilterComponent";
import ProductForListComponent from "../../components/ProductForListComponent";
import PaginationComponent from "../../components/PaginationComponent";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

const ProductListPageComponent = ({ getProducts, categories }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [attrsFilter, setAttrsFilter] = useState([]);
  const { categoryName } = useParams() || "";

  useEffect(() => {
    if (categoryName) {
      let categoryAllData = categories.find(
        (item) => item.name === categoryName.replaceAll(",", "/")
      );
      if (categoryAllData) {
        let mainCategory = categoryAllData.name.split("/")[0];
        let index = categories.findIndex((item) => item.name === mainCategory);
        setAttrsFilter(categories[index].attrs);
      }
    } else {
      setAttrsFilter([]);
    }
  }, [categoryName, categories]);

  useEffect(() => {
    getProducts()
      .then((res) => {
        setProducts(res.products);
        setLoading(false);
      })
      .catch((er) => {
        console.log(er);
        setError(true);
      });
    // eslint-disable-next-line
  }, []);

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
              <AttributesFilterComponent attrsFilter={attrsFilter} />
            </ListGroup.Item>
            <ListGroup.Item>
              <Button variant="primary">Filter</Button>
              <Button variant="danger">Reset</Button>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={9}>
          {loading ? (
            <h1>Loading products...</h1>
          ) : error ? (
            <h1>An error occurred while loading products. Try again later.</h1>
          ) : (
            products.map((product) => {
              return (
                <ProductForListComponent
                  key={product._id}
                  name={product.name}
                  images={product.images}
                  description={product.description}
                  price={product.price}
                  rating={product.rating}
                  reviewsNumber={product.reviewsNumber}
                  productId={product._id}
                />
              );
            })
          )}
          <PaginationComponent />
        </Col>
      </Row>
    </Container>
  );
};

export default ProductListPageComponent;
