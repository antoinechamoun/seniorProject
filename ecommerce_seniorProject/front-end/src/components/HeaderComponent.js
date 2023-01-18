import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import {
  Badge,
  Form,
  Dropdown,
  DropdownButton,
  Button,
  InputGroup,
} from "react-bootstrap";

import { LinkContainer } from "react-router-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../redux/actions/categoryActions";
import { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import { setChatRooms, setSocket } from "../redux/actions/chatActions";

const HeaderComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.userRegisterLogin);
  const itemsCount = useSelector((state) => state.cart.itemsCount);
  const { categories } = useSelector((state) => state.getCategories);
  const [searchCategoryToggle, setSearchCategoryToggle] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const submitHandler = (e) => {
    if (e.keyCode && e.keyCode !== 13) return;
    e.preventDefault();
    if (searchQuery.trim()) {
      if (searchCategoryToggle === "All") {
        navigate(`/product-list/search/${searchQuery}`);
      } else {
        navigate(
          `/product-list/category/${searchCategoryToggle.replaceAll(
            "/",
            ","
          )}/search/${searchQuery}`
        );
      }
    } else if (searchCategoryToggle !== "All") {
      navigate(
        `/product-list/category/${searchCategoryToggle.replaceAll("/", ",")}`
      );
    } else {
      navigate(`/product-list`);
    }
  };

  useEffect(() => {
    if (userInfo.isAdmin) {
      const socket = socketIOClient();
      socket.on("server sends message from client to admin", ({ message }) => {
        dispatch(setSocket(socket));
        dispatch(setChatRooms("exampleUser", message));
      });
    }
  }, [userInfo.isAdmin]);

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>MyEcommerce</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <InputGroup>
              <DropdownButton
                id="dropdown-basic-button"
                title={searchCategoryToggle}
              >
                <Dropdown.Item onClick={() => setSearchCategoryToggle("All")}>
                  All
                </Dropdown.Item>
                {categories.map((category, id) => {
                  return (
                    <Dropdown.Item
                      key={id}
                      onClick={() => setSearchCategoryToggle(category.name)}
                    >
                      {category.name}
                    </Dropdown.Item>
                  );
                })}
              </DropdownButton>
              <Form.Control
                type="text"
                placeholder="Search in shop..."
                onKeyUp={submitHandler}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button onClick={submitHandler} variant="warning">
                <i className="bi bi-search"></i>
              </Button>
            </InputGroup>
          </Nav>
          <Nav>
            {userInfo.isAdmin ? (
              <LinkContainer to="/admin/orders">
                <Nav.Link>
                  Admin
                  <span className="position-absolute top-1 start-10 translate-middle p-2 bg-danger border border-light rounded-circle"></span>
                </Nav.Link>
              </LinkContainer>
            ) : userInfo.name && !userInfo.isAdmin ? (
              <NavDropdown
                title={`${userInfo.name} ${userInfo.lastName}`}
                id="collasible-nav-dropdown"
              >
                <NavDropdown.Item
                  eventKey="/user/my-orders"
                  as={Link}
                  to="/user/my-orders"
                >
                  My orders
                </NavDropdown.Item>
                <NavDropdown.Item eventKey="/user" as={Link} to="/user">
                  My Profile
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => dispatch(logout())}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <>
                <LinkContainer to="/login">
                  <Nav.Link>Login</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/register">
                  <Nav.Link>Register</Nav.Link>
                </LinkContainer>
              </>
            )}
            <LinkContainer to="/cart-page">
              <Nav.Link>
                <Badge pill bg="danger">
                  {itemsCount === 0 ? "" : itemsCount}
                </Badge>
                <i className="bi bi-cart-dash"></i>
                <span className="ms-l"> CART </span>
              </Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default HeaderComponent;
