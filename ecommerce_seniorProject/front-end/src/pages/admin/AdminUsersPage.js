import { Button, Col, Row, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import AdminLinksComponent from "../../components/admin/AdminLinksComponent";
const AdminUsersPage = () => {
  const deleteHandler = () => {
    if (window.confirm("Are you sure?")) alert("User deleted!");
  };
  return (
    <Row className="m-5">
      <Col md={2}>
        <AdminLinksComponent />
      </Col>
      <Col md={10}>
        <h1>Orders</h1>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>First name</th>
              <th>Last name</th>
              <th>Email</th>
              <th>Is Admin</th>
              <th>Edit/Delete</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Mark</td>
              <td>Raig</td>
              <td>marl@gmail.com</td>
              <td>
                <i className="bi bi-check-lg text-success"></i>
              </td>
              <td>
                <LinkContainer to="/admin/edit-user">
                  <Button className="btn-sm">
                    <i className="bi bi-pencil-square"></i>
                  </Button>
                </LinkContainer>
                {" / "}
                <LinkContainer to="/admin/edit-user">
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={deleteHandler}
                  >
                    <i className="bi bi-x-square"></i>
                  </Button>
                </LinkContainer>
              </td>
            </tr>
            <tr>
              <td>1</td>
              <td>Mark</td>
              <td>khoury</td>
              <td>asd@email.com</td>
              <td>
                <i className="bi bi-x-lg text-danger"></i>
              </td>
              <td>
                <LinkContainer to="/admin/edit-user">
                  <Button className="btn-sm">
                    <i className="bi bi-pencil-square"></i>
                  </Button>
                </LinkContainer>
                {" / "}
                <LinkContainer to="/admin/order-details">
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={deleteHandler}
                  >
                    <i className="bi bi-x-square"></i>
                  </Button>
                </LinkContainer>
              </td>
            </tr>
          </tbody>
        </Table>
      </Col>
    </Row>
  );
};

export default AdminUsersPage;
