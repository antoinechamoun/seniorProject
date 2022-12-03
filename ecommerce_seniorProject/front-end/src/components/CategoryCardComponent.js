import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { LinkContainer } from "react-router-bootstrap";

const CategoryCardComponent = ({ category, id }) => {
  const images = [
    "images/categories/tablets.png",
    "images/categories/monitors.png",
    "images/categories/games.png",
    "images/categories/printers.png",
    "images/categories/software.png",
    "images/categories/cameras.png",
    "images/categories/books.png",
    "images/categories/videos.png",
  ];
  return (
    <Card>
      <Card.Img
        crossOrigin="anonymous"
        variant="top"
        style={{ height: "300px" }}
        src={images[id]}
      />
      <Card.Body>
        <Card.Title>{category}</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <LinkContainer to="/product-list">
          <Button variant="primary">Go to category</Button>
        </LinkContainer>
      </Card.Body>
    </Card>
  );
};

export default CategoryCardComponent;
