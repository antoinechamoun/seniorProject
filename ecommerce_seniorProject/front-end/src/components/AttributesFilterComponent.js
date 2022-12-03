import { Form } from "react-bootstrap";

const AttributesFilterComponent = () => {
  return (
    <>
      {[
        { Color: ["red", "blue", "green"] },
        { Ram: ["1 TB", "2 TB", "3 TB"] },
      ].map((item, id) => {
        return (
          <div key={id} className="mb-3">
            <Form.Label>
              <b>{Object.keys(item)}</b>
            </Form.Label>
            {item[Object.keys(item)].map((i, idx) => {
              return (
                <Form.Check
                  type="checkbox"
                  id="default-checkbox"
                  label={i}
                  key={idx}
                  style={{ cursor: "pointer" }}
                />
              );
            })}
          </div>
        );
      })}
    </>
  );
};

export default AttributesFilterComponent;
