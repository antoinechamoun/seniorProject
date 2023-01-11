import { useEffect, useRef, useState } from "react";
import {
  Col,
  Container,
  Form,
  Row,
  Button,
  CloseButton,
  Table,
  Alert,
  Image,
} from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  changeCategory,
  setValuesForAttrFromDb,
  setAttributesTableWrapper,
} from "./utils/utils";

const AdminEditProductPageComponent = ({
  categories,
  fetchProduct,
  updateProductApiRequest,
  reduxDispatch,
  saveAttributeToCatDoc,
  imageDeleteHandler,
  uploadImagesApiRequest,
  uploadImagesCloudinaryApiRequest,
}) => {
  const { id } = useParams();
  const [validated, setValidated] = useState(false);
  const [product, setProduct] = useState({});
  const navigate = useNavigate();
  const [attributesFromDb, setAttributesFromDb] = useState([]);
  const [attributesTable, setAttributesTable] = useState([]);
  const [updateProductResponseState, setUpdateProductResponseState] = useState({
    message: "",
    error: "",
  });
  const createNewAttrKey = useRef(null);
  const createNewAttrVal = useRef(null);
  const attrValue = useRef(null);
  const attrKey = useRef(null);
  const [categoryChosen, setCategoryChosen] = useState("Choose category");
  const [newAttrValue, setNewAttrValue] = useState("");
  const [newKeyValue, setNewKeyValue] = useState("");
  const [imageRemoved, setImageRemoved] = useState(false);
  const [isUploading, setIsUploading] = useState("");
  const [imageUploaded, setImageUploaded] = useState(false);

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
      updateProductApiRequest(id, formInputs)
        .then((res) => {
          if (res.message === "product updated") {
            navigate("/admin/products");
          }
        })
        .catch((er) =>
          setUpdateProductResponseState({
            error: er.response.data.message
              ? er.response.data.message
              : er.response.data,
          })
        );
    }
    setValidated(true);
  };

  useEffect(() => {
    fetchProduct(id)
      .then((res) => setProduct(res))
      .catch((er) => console.log(er));
    // eslint-disable-next-line
  }, [id, imageRemoved, imageUploaded]);

  useEffect(() => {
    let categoryOfEditedProduct = categories.find(
      (item) => item.name === product.category
    );
    if (categoryOfEditedProduct) {
      const mainCategoryOfEditedProduct =
        categoryOfEditedProduct.name.split("/")[0];
      const mainCategoryOfEditedProductAllData = categories.find(
        (category) => category.name === mainCategoryOfEditedProduct
      );
      if (
        mainCategoryOfEditedProductAllData &&
        mainCategoryOfEditedProductAllData.attrs.length > 0
      ) {
        setAttributesFromDb(mainCategoryOfEditedProductAllData.attrs);
      }
    }
    setCategoryChosen(product.category);
    setAttributesTable(product.attrs);
    // eslint-disable-next-line
  }, [product]);

  const attributeValueSelected = (e) => {
    if (e.target.value !== "Choose attribute value") {
      setAttributesTableWrapper(
        attrKey.current.value,
        e.target.value,
        setAttributesTable
      );
    }
    setCategoryChosen(e.target.value);
  };

  const deleteAttribute = (key) => {
    setAttributesTable((table) => table.filter((item) => item.key !== key));
  };

  const checkKeyDown = (e) => {
    if (e.code === "Enter" || e.code === "NumpadEnter") e.preventDefault();
  };

  const newAttrHandler = (e) => {
    e.preventDefault();
    if (e.target.name === "newAttrKey") {
      setNewKeyValue(e.target.value);
    } else if (e.target.name === "newAttrValue") {
      setNewAttrValue(e.target.value);
    }

    if (e.keyCode && e.keyCode === 13) {
      if (newAttrValue && newKeyValue) {
        reduxDispatch(
          saveAttributeToCatDoc(newKeyValue, newAttrValue, categoryChosen)
        );
        setAttributesTableWrapper(
          newKeyValue,
          newAttrValue,
          setAttributesTable
        );
        e.target.value = "";
        createNewAttrVal.current.value = "";
        createNewAttrKey.current.value = "";
        setNewAttrValue("");
        setNewKeyValue("");
      }
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
          <h1>Edit product</h1>
          <Form
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
            onKeyDown={(e) => checkKeyDown(e)}
          >
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                name="name"
                required
                type="text"
                defaultValue={product.name}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                name="description"
                required
                as="textarea"
                rows={3}
                defaultValue={product.description}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCount">
              <Form.Label>Count in stock</Form.Label>
              <Form.Control
                name="count"
                required
                type="number"
                defaultValue={product.count}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                name="price"
                required
                type="text"
                defaultValue={product.price}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCategory">
              <Form.Label>Category</Form.Label>
              <Form.Select
                name="category"
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
                {categories.map((category, id) => {
                  return product.category === category.name ? (
                    <option key={id} selected value={category.name}>
                      {category.name}
                    </option>
                  ) : (
                    <option key={id} value={category.name}>
                      {category.name}
                    </option>
                  );
                })}
              </Form.Select>
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
                      {attributesFromDb.map((attr, id) => (
                        <option value={attr.key} key={id}>
                          {attr.key}
                        </option>
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
                      name="attrVal"
                      ara-label="Default select example"
                      ref={attrValue}
                      onChange={attributeValueSelected}
                    >
                      <option>Choose attribute value</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
            )}
            <Row>
              {attributesTable && attributesTable.length > 0 && (
                <Table>
                  <thead>
                    <tr>
                      <th>Attribute</th>
                      <th>Value</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {attributesTable.map((item, id) => (
                      <tr key={id}>
                        <td>{item.key}</td>
                        <td>{item.value}</td>
                        <td>
                          <CloseButton
                            onClick={() => deleteAttribute(item.key)}
                          />
                        </td>
                      </tr>
                    ))}
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
                    name="newAttrKey"
                    required={newAttrValue}
                    type="text"
                    onKeyUp={newAttrHandler}
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
                    ref={createNewAttrVal}
                    disabled={categoryChosen === "Choose category"}
                    placeholder="first choose or create category"
                    name="newAttrValue"
                    required={newKeyValue}
                    type="text"
                    onKeyUp={newAttrHandler}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Alert
              show={newAttrValue !== "" && newKeyValue !== ""}
              variant="primary"
            >
              After typing key and attribute value press enter on one of the
              field
            </Alert>
            <Form.Group controlId="formFileMultiple" className="mb-3 mt-3">
              <Form.Label>Images</Form.Label>
              <Row>
                {product.images &&
                  product.images.map((image, idx) => (
                    <Col key={idx} style={{ position: "relative" }} xs={3}>
                      <Image
                        crossOrigin="anonymous"
                        src={image.path ?? null}
                        fluid
                      />
                      <i
                        className="bi bi-x text-danger"
                        onClick={() =>
                          imageDeleteHandler(image.path, id).then(() =>
                            setImageRemoved(!imageRemoved)
                          )
                        }
                        style={{
                          cursor: "pointer",
                          position: "absolute",
                          top: "-10px",
                          left: "5px",
                          transform: "scale(2.7)",
                        }}
                      ></i>
                    </Col>
                  ))}
              </Row>
              <Form.Control
                type="file"
                required
                multiple
                onChange={(e) => {
                  setIsUploading("upload files in progress ...");
                  if (process.env.NODE_ENV !== "production") {
                    uploadImagesApiRequest(e.target.files, id)
                      .then(() => {
                        setIsUploading("upload file completed");
                        setImageUploaded(!imageUploaded);
                      })
                      .catch((err) => {
                        setIsUploading(
                          err.response.data.message
                            ? err.response.data.message
                            : err.response.data
                        );
                      });
                  } else {
                    uploadImagesCloudinaryApiRequest(e.target.files, id);
                    setIsUploading(
                      "upload file completed. Wait for the result take effect, refresh also if necessary"
                    );
                    setTimeout(() => {
                      setImageUploaded(!imageUploaded);
                    });
                  }
                }}
              />
            </Form.Group>
            {isUploading}
            <Button variant="primary" type="submit">
              Update
            </Button>
            {updateProductResponseState.error ?? ""}
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminEditProductPageComponent;
