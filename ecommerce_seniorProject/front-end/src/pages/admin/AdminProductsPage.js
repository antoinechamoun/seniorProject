import { Col, Row, Table, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import AdminLinksComponent from "../../components/admin/AdminLinksComponent";
const AdminProductsPage = () => {
  const deleteHandler = () => {
    if (window.confirm("Are you sure")) {
      alert("Product deleted");
    }
  };
  return (
    <Row className="m-5">
      <Col md={2}>
        <AdminLinksComponent />
      </Col>
      <Col md={10}>
        <h1>
          Products List{" "}
          <LinkContainer to="/admin/create-new-product">
            <Button variant="primary" size="lg">
              Create new
            </Button>
          </LinkContainer>
        </h1>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Product name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Edit/Delete</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Mark Raig</td>
              <td>2022-09-12</td>
              <td>$123</td>
              <td>
                <LinkContainer to="/admin/edit-product">
                  <Button className="btn-sm">
                    <i class="bi bi-pencil-square"></i>
                  </Button>
                </LinkContainer>
                {" / "}
                <Button
                  variant="danger"
                  className="btn-sm"
                  onClick={deleteHandler}
                >
                  <i class="bi bi-x-circle"></i>
                </Button>
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>Mark khoury</td>
              <td>2022-09-12</td>
              <td>$123</td>
              <td>
                <LinkContainer to="/admin/edit-product">
                  <Button className="btn-sm">
                    <i class="bi bi-pencil-square"></i>
                  </Button>
                </LinkContainer>
                {" / "}
                <Button
                  variant="danger"
                  className="btn-sm"
                  onClick={deleteHandler}
                >
                  <i class="bi bi-x-circle"></i>
                </Button>
              </td>
            </tr>
          </tbody>
        </Table>
      </Col>
    </Row>
  );
};

export default AdminProductsPage;
