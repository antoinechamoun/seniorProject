import { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Spinner,
  Alert,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const LoginPageComponent = ({
  loginUserApiRequest,
  reduxDispatch,
  setReduxUserState,
}) => {
  const [validated, setValidated] = useState(false);
  const [loginUserResponseState, setLoginUserResponseState] = useState({
    success: "",
    error: "",
    loading: false,
  });

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const form = event.currentTarget.elements;
    const email = form.email.value;
    const password = form.password.value;
    const doNotLogout = form.doNotLogout.checked;

    if (event.currentTarget.checkValidity() === true && email && password) {
      setLoginUserResponseState({ loading: true });
      loginUserApiRequest(email, password, doNotLogout)
        .then((res) => {
          setLoginUserResponseState({
            success: res.success,
            loading: false,
            error: "",
          });

          if (res.userLoggedIn) {
            reduxDispatch(setReduxUserState(res.userLoggedIn));
          }

          if (res.success === "User logged in" && !res.userLoggedIn.isAdmin) {
            navigate("/user", { replace: true });
          } else {
            navigate("/admin/orders", { replace: true });
          }
        })
        .catch((er) =>
          setLoginUserResponseState({
            error: er.response.data.message
              ? er.response.data.message
              : er.response.data,
          })
        );
    }

    setValidated(true);
  };
  return (
    <Container>
      <Row className="mt-5 justify-content-md-center">
        <Col md={6}>
          <h1>Login</h1>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                required
                type="email"
                placeholder="Email address"
                name="email"
              />
              <Form.Control.Feedback type="invalid">
                *This field is required
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                type="password"
                placeholder="Password"
                name="password"
                minLength={6}
              />
              <Form.Control.Feedback type="invalid">
                Please enter a valid password
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check
                name="doNotLogout"
                type="checkbox"
                label="Do not logout"
              />
              <Form.Control.Feedback type="invalid">
                Please enter a valid password
              </Form.Control.Feedback>
            </Form.Group>

            <Row className="pb-2">
              <Col>
                Don't you have an account?
                <Link to="/register">Register</Link>
              </Col>
            </Row>
            <Button variant="primary" type="submit">
              {loginUserResponseState &&
              loginUserResponseState.loading === true ? (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              ) : (
                ""
              )}
              Login
            </Button>
            <Alert
              show={
                loginUserResponseState &&
                loginUserResponseState.error === "wrong credentials"
              }
              variant="danger"
              className="mt-2"
            >
              Wrong credentials!
            </Alert>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPageComponent;
