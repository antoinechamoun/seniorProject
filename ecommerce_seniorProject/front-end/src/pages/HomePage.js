import CategoryCardComponent from "../components/CategoryCardComponent";
import ProductCarouselComponent from "../components/ProductCarouselComponent";
import { Row, Container } from "react-bootstrap";
const HomePage = () => {
  const categories = [
    "Tablets",
    "Monitors",
    "Games",
    "Printers",
    "Software",
    "Cameras",
    "Books",
    "Videos",
  ];
  return (
    <div>
      <ProductCarouselComponent />
      <Container>
        <Row xs={1} md={2} className="g-4 mt-5">
          {categories.map((category, id) => {
            return (
              <CategoryCardComponent category={category} key={id} id={id} />
            );
          })}
        </Row>
      </Container>
    </div>
  );
};

export default HomePage;
