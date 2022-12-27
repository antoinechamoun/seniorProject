import { Button, Col, Row, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import AdminLinksComponent from "../../../components/admin/AdminLinksComponent";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/actions/userActions";

const UsersPageComponent = ({ fetchUsers, deleteUser }) => {
  const [users, setUsers] = useState([]);
  const [userDeleted, setUserDeleted] = useState(false);
  const dispatch = useDispatch();

  const deleteHandler = async (userId) => {
    if (window.confirm("Are you sure?")) {
      const data = await deleteUser(userId);
      if (data === "User removed") {
        setUserDeleted(!userDeleted);
      }
    }
  };

  useEffect(() => {
    const abctrl = new AbortController();
    fetchUsers(abctrl)
      .then((res) => setUsers(res))
      .catch((er) => {
        console.log(dispatch(logout()));
      });
    return () => abctrl.abort();
    // eslint-disable-next-line
  }, [userDeleted]);

  return (
    <Row className="m-5">
      <Col md={2}>
        <AdminLinksComponent />
      </Col>
      <Col md={10}>
        <h1>Orders</h1>
        {console.log(users)}
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
            {users.map((user, idx) => (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>{user.name}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>
                  {user.isAdmin ? (
                    <i className="bi bi-check-lg text-success"></i>
                  ) : (
                    <i className="bi bi-x-lg text-danger"></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/admin/edit-user/${user._id}`}>
                    <Button className="btn-sm">
                      <i className="bi bi-pencil-square"></i>
                    </Button>
                  </LinkContainer>
                  {" / "}
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(user._id)}
                  >
                    <i className="bi bi-x-square"></i>
                  </Button>
                </td>
              </tr>
            ))}
            {/* <tr>
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
            </tr> */}
          </tbody>
        </Table>
      </Col>
    </Row>
  );
};

export default UsersPageComponent;
