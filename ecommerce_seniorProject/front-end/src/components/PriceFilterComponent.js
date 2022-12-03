import Form from "react-bootstrap/Form";

const PriceFilterComponent = () => {
  return (
    <>
      <Form.Label>
        <span className="fw-bold">Price no greater than: </span>
      </Form.Label>
      <Form.Range min={10} max={1000} step={10}></Form.Range>
    </>
  );
};

export default PriceFilterComponent;
