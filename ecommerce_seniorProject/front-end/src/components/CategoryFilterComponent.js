import { Form } from "react-bootstrap";
const CategoryFilterComponent = () => {
  return (
    <Form>
      {Array.from({ length: 5 }).map((_, id) => (
        <div key={id}>
          <Form.Check type="checkbox" id={`check-api2-${id}`}>
            <Form.Check.Input type="checkbox" isValid />
            <Form.Check.Label style={{ cursor: "pointer" }}>
              Category-{id}
            </Form.Check.Label>
          </Form.Check>
        </div>
      ))}
    </Form>
  );
};

export default CategoryFilterComponent;
