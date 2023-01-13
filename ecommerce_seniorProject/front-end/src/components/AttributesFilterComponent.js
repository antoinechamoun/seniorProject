import { Form } from "react-bootstrap";

const AttributesFilterComponent = ({ attrsFilter, setAttrsFromFilter }) => {
  return (
    <>
      {attrsFilter &&
        attrsFilter.length > 0 &&
        attrsFilter.map((filter, id) => {
          return (
            <div key={id} className="mb-3">
              <Form.Label>
                <b>{filter.key}</b>
              </Form.Label>
              {filter.value.map((valueForKey, idx) => {
                return (
                  <Form.Check
                    type="checkbox"
                    id="default-checkbox"
                    label={valueForKey}
                    key={idx}
                    style={{ cursor: "pointer" }}
                    onChange={(e) => {
                      setAttrsFromFilter((filters) => {
                        if (filters.length === 0) {
                          return [{ key: filter.key, values: [valueForKey] }];
                        }
                        let index = filters.findIndex(
                          (item) => item.key === filter.key
                        );
                        if (index === -1) {
                          return [
                            ...filters,
                            { key: filter.key, values: [valueForKey] },
                          ];
                        }

                        if (e.target.checked) {
                          filters[index].values.push(valueForKey);
                          let unique = [...new Set(filters[index].values)];
                          filters[index].values = unique;
                          return [...filters];
                        }

                        let valuesWithoutUnChecked = filters[
                          index
                        ].values.filter((val) => val !== valueForKey);
                        filters[index].values = valuesWithoutUnChecked;
                        if (valuesWithoutUnChecked.length > 0) {
                          return [...filters];
                        } else {
                          let filtersWithoutOneKey = filters.filter(
                            (item) => item.key !== filter.key
                          );
                          return [...filtersWithoutOneKey];
                        }
                      });
                    }}
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
