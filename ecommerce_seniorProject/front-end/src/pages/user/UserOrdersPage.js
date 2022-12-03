import { Col, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";

const UserOrdersPage = () => {
  return (
    <Row className="m-5">
      <Col md={12}>
        <h1>My Orders</h1>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>User</th>
              <th>Date</th>
              <th>Total</th>
              <th>Delivered</th>
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
                <i class="bi bi-check-lg text-success"></i>
              </td>
              <td>
                <Link to="/user/order-details">go to order</Link>
              </td>
            </tr>
            <tr>
              <td>1</td>
              <td>Mark khoury</td>
              <td>2022-09-12</td>
              <td>$123</td>
              <td>
                <i class="bi bi-x-lg text-danger"></i>
              </td>
              <td>
                <Link to="/user/order-details">go to order</Link>
              </td>
            </tr>
          </tbody>
        </Table>
      </Col>
    </Row>
  );
};

export default UserOrdersPage;
