import { useRef, useState } from "react";
import { Form } from "react-bootstrap";
import { useSelector } from "react-redux";

const CategoryFilterComponent = ({ setCategoriesFromFilter }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const { categories } = useSelector((state) => state.getCategories);
  const myRefs = useRef([]);

  const selectCategory = (e, category, idx) => {
    setCategoriesFromFilter((items) => {
      return { ...items, [category.name]: e.target.checked };
    });
    let selectedMainCategory = category.name.split("/")[0];
    let allCategories = myRefs.current.map((_, id) => {
      return { name: categories[id].name, idx: id };
    });
    let indexesOfMainCategories = allCategories.reduce((acc, item) => {
      let cat = item.name.split("/")[0];
      if (selectedMainCategory === cat) {
        acc.push(item.idx);
      }
      return acc;
    }, []);
    if (e.target.checked) {
      setSelectedCategories((old) => [...old, "cat"]);
      myRefs.current.map((_, idx) => {
        if (!indexesOfMainCategories.includes(idx)) {
          myRefs.current[idx].disabled = true;
        }
        return "";
      });
    } else {
      setSelectedCategories((old) => {
        let a = [...old];
        a.pop();
        if (a.length === 0) {
          window.location.href = "/product-list";
        }
        return a;
      });
      myRefs.current.map((_, idx2) => {
        if (allCategories.length === 1) {
          if (idx2 !== idx) {
            myRefs.current[idx2].disabled = false;
          }
        } else if (selectedCategories.length === 1) {
          myRefs.current[idx2].disabled = false;
        }
        return "";
      });
    }
  };

  return (
    <Form>
      {categories.map((category, id) => (
        <div key={id}>
          <Form.Check type="checkbox" id={`check-api2-${id}`}>
            <Form.Check.Input
              ref={(el) => (myRefs.current[id] = el)}
              type="checkbox"
              isValid
              onChange={(e) => selectCategory(e, category, id)}
            />
            <Form.Check.Label style={{ cursor: "pointer" }}>
              {category.name}
            </Form.Check.Label>
          </Form.Check>
        </div>
      ))}
    </Form>
  );
};

export default CategoryFilterComponent;
