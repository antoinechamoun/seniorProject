import React, { useRef, useState } from "react";
import {
  Col,
  Container,
  Form,
  Row,
  Button,
  CloseButton,
  Table,
  Alert,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { saveAttributeToCatDoc } from "../../../redux/actions/categoryActions";
import {
  changeCategory,
  setValuesForAttrFromDb,
  setAttributesTableWrapper,
} from "./utils/utils";

const AdminCreateProductPageComponent = ({
  createProductApiRequest,
  uploadImagesApiRequest,
  uploadImagesCloudinaryApiRequest,
  reduxDispatch,
  categories,
  newCategory,
  deleteCategory,
}) => {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [attributesTable, setAttributesTable] = useState([]);
  const [attributesFromDb, setAttributesFromDb] = useState([]);
  const [images, setImages] = useState(false);
  const [isCreating, setIsCreating] = useState("");
  const [createProductResponseState, setCreateProductResponseState] = useState({
    message: "",
    error: "",
  });
  const [categoryChosen, setCategoryChosen] = useState("Choose category");
  const categorySelect = useRef();
  const attrValue = useRef(null);
  const attrKey = useRef(null);
  const createNewAttrKey = useRef(null);
  const createNewAttrVal = useRef(null);
  const [newAttrKey, setNewAttrKey] = useState("");
  const [newAttrValue, setNewAttrValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const form = e.currentTarget.elements;
    const formInputs = {
      name: form.name.value,
      description: form.description.value,
      count: form.count.value,
      price: form.price.value,
      category: form.category.value,
      attributesTable: attributesTable,
    };
    if (e.currentTarget.checkValidity() === true) {
      if (images.length > 3) {
        setIsCreating("too many files");
        return;
      }
      createProductApiRequest(formInputs)
        .then((res) => {
          if (images) {
            if (process.env.NODE_ENV !== "production") {
              uploadImagesApiRequest(images, res.productId)
                .then((res) => {})
                .catch((er) =>
                  setIsCreating(
                    er.response.data.message
                      ? er.response.data.message
                      : er.response.data
                  )
                );
            } else {
              uploadImagesCloudinaryApiRequest(images, res.productId);
            }
          }
          if (res.message === "product created") navigate("/admin/products");
        })
        .catch((er) =>
          setCreateProductResponseState({
            error: er.response.data.message
              ? er.response.data.message
              : er.response.data,
          })
        );
    }
    setValidated(true);
  };

  const uploadHandler = (images) => {
    setImages(images);
  };

  const newCategoryHandler = (e) => {
    if (e.keyCode && e.keyCode === 13 && e.target.value) {
      reduxDispatch(newCategory(e.target.value));
      setTimeout(() => {
        setCategoryChosen(e.target.value);
        categorySelect.current.value = e.target.value;
        e.target.value = "";
      }, 1000);
    }
  };

  const deleteCategoryHandler = () => {
    if (categoryChosen !== "Choose a category") {
      reduxDispatch(deleteCategory(categorySelect.current.value));
      setCategoryChosen("Choose category");
    }
  };

  const attributeValueSelected = (e) => {
    if (e.target.value !== "Choose attribute value") {
      setAttributesTableWrapper(
        attrKey.current.value,
        e.target.value,
        setAttributesTable
      );
    }
  };

  const deleteAttribute = (key) => {
    setAttributesTable((table) => table.filter((item) => item.key !== key));
  };

  const newAttrKeyHandler = (e) => {
    e.preventDefault();
    setNewAttrKey(e.target.value);
    addNewAttributeManually(e);
  };
  const newAttrValueHandler = (e) => {
    e.preventDefault();
    setNewAttrValue(e.target.value);
    addNewAttributeManually(e);
  };

  const addNewAttributeManually = (e) => {
    e.preventDefault();
    if (e.keyCode && e.keyCode === 13) {
      console.log(newAttrKey, newAttrValue);
      if (newAttrKey !== "" && newAttrValue !== "") {
        reduxDispatch(
          saveAttributeToCatDoc(newAttrKey, newAttrValue, categoryChosen)
        );
        setAttributesTableWrapper(newAttrKey, newAttrValue, setAttributesTable);
        e.target.value = "";
        createNewAttrKey.current.value = "";
        createNewAttrVal.current.value = "";
        setNewAttrKey("");
        setNewAttrValue("");
      }
    }
  };

  const checkKeyDown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
    }
  };

  return (
    <Container>
      <Row className="mt-5 justify-content-md-center">
        <Col md={1}>
          <Link to="/admin/products" className="btn btn-info my-3">
            Go Back
          </Link>
        </Col>
        <Col md={6}>
          <h1>Create a new product</h1>
          <Form
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
            onKeyDown={checkKeyDown}
          >
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control name="name" required type="text"></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                name="description"
                required
                as="textarea"
                rows={3}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCount">
              <Form.Label>Count in stock</Form.Label>
              <Form.Control name="count" required type="number" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control name="price" required type="text" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCategory">
              <Form.Label>
                Category
                <CloseButton onClick={deleteCategoryHandler} />(
                <small>remove selected</small>)
              </Form.Label>
              <Form.Select
                name="category"
                ref={categorySelect}
                required
                aria-label="Default select example"
                onChange={(e) =>
                  changeCategory(
                    e,
                    categories,
                    setAttributesFromDb,
                    setCategoryChosen
                  )
                }
              >
                <option value="Choose category">Choose a category</option>
                {categories.map((category, idx) => {
                  return (
                    <option key={idx} value={category.name}>
                      {category.name}
                    </option>
                  );
                })}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicNewCategory">
              <Form.Label>
                or create a new category (e.g. Computers/Laptops/Intel){" "}
              </Form.Label>
              <Form.Control
                onKeyUp={newCategoryHandler}
                name="newCategory"
                type="text"
              />
            </Form.Group>

            {attributesFromDb.length > 0 && (
              <Row className="mt-5">
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicAttributes">
                    <Form.Label>Choose attribute and set value</Form.Label>
                    <Form.Select
                      name="attrKey"
                      ara-label="Default select example"
                      ref={attrKey}
                      onChange={(e) =>
                        setValuesForAttrFromDb(e, attrValue, attributesFromDb)
                      }
                    >
                      <option>Choose attribute</option>
                      {attributesFromDb.map((item, idx) => (
                        <React.Fragment key={idx}>
                          <option value={item.key}>{item.key}</option>
                        </React.Fragment>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group
                    className="mb-3"
                    controlId="formBasicAttributeValue"
                  >
                    <Form.Label>Attribute value</Form.Label>
                    <Form.Select
                      onChange={attributeValueSelected}
                      name="attrVal"
                      ref={attrValue}
                      ara-label="Default select example"
                    >
                      <option>Choose attribute value</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
            )}
            <Row>
              {attributesTable.length > 0 && (
                <Table>
                  <thead>
                    <tr>
                      <th>Attribute</th>
                      <th>Value</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {attributesTable.map((item, idx) => {
                      return (
                        <tr key={idx}>
                          <td>{item.key}</td>
                          <td>{item.value}</td>
                          <td>
                            <CloseButton
                              onClick={() => deleteAttribute(item.key)}
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              )}
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicNewAttribute">
                  <Form.Label>Create new attribute</Form.Label>
                  <Form.Control
                    ref={createNewAttrKey}
                    disabled={categoryChosen === "Choose category"}
                    placeholder="first choose or create category"
                    name="newAttrValue"
                    required
                    type="text"
                    onKeyUp={newAttrKeyHandler}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group
                  className="mb-3"
                  controlId="formBasicNewAttributeValue"
                >
                  <Form.Label>Attribute value</Form.Label>
                  <Form.Control
                    disabled={categoryChosen === "Choose category"}
                    placeholder="first choose or create category"
                    name="newAttrValue"
                    type="text"
                    required={newAttrKey}
                    ref={createNewAttrVal}
                    onKeyUp={newAttrValueHandler}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Alert
              show={newAttrKey !== "" && newAttrValue !== ""}
              variant="primary"
            >
              After typing key and attribute value press enter on one of the
              field
            </Alert>
            <Form.Group controlId="formFileMultiple" className="mb-3 mt-3">
              <Form.Label>Images</Form.Label>
              <Form.Control
                type="file"
                required
                multiple
                onChange={(e) => {
                  uploadHandler(e.target.files);
                }}
              />
              {isCreating}
            </Form.Group>
            <Button variant="primary" type="submit">
              Create
            </Button>
            {createProductResponseState.error ?? ""}
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminCreateProductPageComponent;
