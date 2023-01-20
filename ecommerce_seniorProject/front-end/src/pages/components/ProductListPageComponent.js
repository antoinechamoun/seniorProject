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
import { useLocation, useNavigate, useParams } from "react-router-dom";

const ProductListPageComponent = ({ getProducts, categories }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [attrsFilter, setAttrsFilter] = useState([]);
  const [attrsFromFilter, setAttrsFromFilter] = useState([]);
  const [showResetFiltersButton, setShowResetFiltersButton] = useState(false);

  const [filters, setFilters] = useState({});
  const [price, setPrice] = useState(500);
  const [ratingFromFilter, setRatingFromFilter] = useState({});
  const [categoriesFromFilter, setCategoriesFromFilter] = useState({});
  const [sortOption, setSortOption] = useState("");
  const [paginationLinksNumber, setPaginationLinksNumber] = useState(null);
  const [pageNum, setPageNum] = useState(null);

  const { categoryName } = useParams() || "";
  const { pageNumParam } = useParams() || 1;
  const { searchQuery } = useParams() || "";
  const location = useLocation();
  const navigate = useNavigate();

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
    getProducts(categoryName, pageNumParam, searchQuery, filters, sortOption)
      .then((res) => {
        setProducts(res.products);
        setPaginationLinksNumber(res.paginationLinksNumber);
        setPageNum(res.pageNum);
        setLoading(false);
      })
      .catch((er) => {
        console.log(er);
        setError(true);
      });
    // eslint-disable-next-line
  }, [categoryName, pageNumParam, searchQuery, filters, sortOption]);

  const handleFilters = () => {
    console.log(location.pathname);
    navigate(location.pathname.replace(/\/[0-9]+$/, ""));
    setShowResetFiltersButton(true);
    setFilters({
      price,
      rating: ratingFromFilter,
      categories: categoriesFromFilter,
      attrs: attrsFromFilter,
    });
  };

  useEffect(() => {
    if (Object.entries(categoriesFromFilter).length > 0) {
      setAttrsFilter([]);
      let cat = [];
      let count;
      Object.entries(categoriesFromFilter).forEach(([category, checked]) => {
        if (checked) {
          let name = category.split("/")[0];
          cat.push(name);
          count = cat.filter((x) => x === name).length;
          if (count === 1) {
            let index = categories.findIndex((item) => item.name === name);
            setAttrsFilter((attrs) => [...attrs, ...categories[index].attrs]);
          }
        }
      });
    }
  }, [categories, categoriesFromFilter]);

  const resetFilters = () => {
    setShowResetFiltersButton(false);
    setFilters({});
    window.location.href = "/product-list";
  };

  return (
    <Container fluid>
      <Row>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item className="mb-3 mt-3">
              <SortOptionsComponent setSortOption={setSortOption} />
            </ListGroup.Item>
            <ListGroup.Item>
              <span className="fw-bold">FILTER: </span> <br />
              <PriceFilterComponent price={price} setPrice={setPrice} />
            </ListGroup.Item>
            <ListGroup.Item>
              <RatingFilterComponent
                setRatingFromFilter={setRatingFromFilter}
              />
            </ListGroup.Item>
            {!location.pathname.match(/\/category/) && (
              <ListGroup.Item>
                <span className="fw-bold">Category: </span> <br />
                <CategoryFilterComponent
                  setCategoriesFromFilter={setCategoriesFromFilter}
                />
              </ListGroup.Item>
            )}
            <ListGroup.Item>
              <AttributesFilterComponent
                attrsFilter={attrsFilter}
                setAttrsFromFilter={setAttrsFromFilter}
              />
            </ListGroup.Item>
            <ListGroup.Item>
              <Button variant="primary" onClick={handleFilters}>
                Filter
              </Button>
              {showResetFiltersButton && (
                <Button variant="danger" onClick={resetFilters}>
                  Reset
                </Button>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={9}>
          {loading ? (
            <h1>Loading products...</h1>
          ) : error ? (
            <h1>An error occurred while loading products. Try again later.</h1>
          ) : products.length === 0 ? (
            <h1>No available products...</h1>
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
          {paginationLinksNumber > 1 ? (
            <PaginationComponent
              categoryName={categoryName}
              searchQuery={searchQuery}
              paginationLinksNumber={paginationLinksNumber}
              pageNum={pageNum}
            />
          ) : null}
        </Col>
      </Row>
    </Container>
  );
};

export default ProductListPageComponent;
