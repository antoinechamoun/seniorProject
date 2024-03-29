import { Form } from "react-bootstrap";
import { Rating } from "react-simple-star-rating";
const RatingFilterComponent = ({ setRatingFromFilter }) => {
  return (
    <>
      <span className="fw-bold">Rating</span>
      {Array.from({ length: 5 }).map((_, id) => {
        return (
          <Form.Check key={id} type="checkbox" id={`check-api-${id}`}>
            <Form.Check.Input
              type="checkbox"
              isValid
              onChange={(e) =>
                setRatingFromFilter((items) => {
                  return { ...items, [5 - id]: e.target.checked };
                })
              }
            />
            <Form.Check.Label style={{ cursor: "pointer" }}>
              <Rating readonly size={20} initialValue={5 - id} />
            </Form.Check.Label>
          </Form.Check>
        );
      })}
    </>
  );
};

export default RatingFilterComponent;
