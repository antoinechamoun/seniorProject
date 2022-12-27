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
import { Link } from "react-router-dom";

const RegisterPageComponent = ({
  registerUserApiRequest,
  setReduxUserState,
  reduxDispatch,
}) => {
  const [validated, setValidated] = useState(false);
  const [registerUserResponseState, setRegisterUserResponseState] = useState({
    success: "",
    error: "",
    loading: false,
  });
  const [passwordMatches, setPasswordMatches] = useState(true);

  const onChange = () => {
    const password = document.querySelector("input[name=password]");
    const confirmPassword = document.querySelector(
      "input[name=confirmPassword]"
    );
    if (confirmPassword.value === password.value) {
      setPasswordMatches(true);
    } else {
      setPasswordMatches(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget.elements;
    const name = form.name.value;
    const lastName = form.lastName.value;
    const email = form.email.value;
    const password = form.password.value;
    if (
      event.currentTarget.checkValidity() === true &&
      email &&
      name &&
      lastName &&
      password &&
      form.password.value === form.confirmPassword.value
    ) {
      setRegisterUserResponseState({ loading: true });
      registerUserApiRequest(name, lastName, email, password)
        .then((res) => {
          setRegisterUserResponseState({
            success: res.success,
            loading: false,
          });
          reduxDispatch(setReduxUserState(res.userCreated));
        })
        .catch((er) => {
          setRegisterUserResponseState({
            error: er.response.data.error
              ? er.response.data.error
              : er.response.data,
          });
        });
    }

    setValidated(true);
  };
  return (
    <Container>
      <Row className="mt-5 justify-content-md-center">
        <Col md={6}>
          <h1>Register</h1>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="validationCustom01">
              <Form.Label>First name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="First name"
                name="name"
              />
              <Form.Control.Feedback type="invalid">
                *This field is required
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicLastName">
              <Form.Label>Last name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Last name"
                name="lastName"
              />
              <Form.Control.Feedback type="invalid">
                *This field is required
              </Form.Control.Feedback>
            </Form.Group>

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
                onChange={onChange}
                minLength={6}
              />
              <Form.Control.Feedback type="invalid">
                Please enter a valid password
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPasswordRepeat">
              <Form.Label>Repeat Password</Form.Label>
              <Form.Control
                required
                type="password"
                placeholder="Repeat Password"
                name="confirmPassword"
                onChange={onChange}
                isInvalid={!passwordMatches}
              />
              <Form.Control.Feedback type="invalid">
                Both passwords should match
              </Form.Control.Feedback>
            </Form.Group>

            <Row className="pb-2">
              <Col>
                Do you have an account already?
                <Link to="/login">Login</Link>
              </Col>
            </Row>
            <Button type="submit">
              {registerUserResponseState &&
              registerUserResponseState.loading === true ? (
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
              Register
            </Button>
            <Alert
              show={
                registerUserResponseState &&
                registerUserResponseState.error === "user exists"
              }
              variant="danger"
              className="mt-2"
            >
              User with this email already exists!
            </Alert>
            <Alert
              show={
                registerUserResponseState &&
                registerUserResponseState.success === "user created"
              }
              variant="info"
              className="mt-2"
            >
              User created!
            </Alert>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterPageComponent;
