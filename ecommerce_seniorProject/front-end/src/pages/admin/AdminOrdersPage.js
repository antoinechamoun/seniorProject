import { Col, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import AdminLinksComponent from "../../components/admin/AdminLinksComponent";
const AdminOrdersPage = () => {
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
              <th>User</th>
              <th>Date</th>
              <th>Total</th>
              <th>Delivered</th>
              <th>Payment method</th>
              <th>Order details</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Mark Raig</td>
              <td>2022-09-12</td>
              <td>$123</td>
              <td>
                <i className="bi bi-check-lg text-success"></i>
              </td>
              <td>Paypal</td>
              <td>
                <Link to="/admin/order-details">go to order</Link>
              </td>
            </tr>
            <tr>
              <td>1</td>
              <td>Mark khoury</td>
              <td>2022-09-12</td>
              <td>$123</td>
              <td>
                <i className="bi bi-x-lg text-danger"></i>
              </td>
              <td>Cash on delivery</td>
              <td>
                <Link to="/admin/order-details">go to order</Link>
              </td>
            </tr>
          </tbody>
        </Table>
      </Col>
    </Row>
  );
};

export default AdminOrdersPage;
