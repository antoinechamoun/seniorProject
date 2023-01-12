import CategoryCardComponent from "../../components/CategoryCardComponent";
import ProductCarouselComponent from "../../components/ProductCarouselComponent";
import { Row, Container } from "react-bootstrap";
import { useState, useEffect } from "react";
const HomePageComponent = ({ categories }) => {
  const [mainCategories, setMainCategories] = useState([]);

  useEffect(() => {
    setMainCategories((cat) =>
      categories.filter((item) => !item.name.includes("/"))
    );
  }, [categories]);

  return (
    <div>
      <ProductCarouselComponent />
      <Container>
        <Row xs={1} md={2} className="g-4 mt-5">
          {mainCategories.map((category, id) => {
            return (
              <CategoryCardComponent category={category} key={id} id={id} />
            );
          })}
        </Row>
      </Container>
    </div>
  );
};

export default HomePageComponent;
