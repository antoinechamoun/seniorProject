export const changeCategory = (
  e,
  categories,
  setAttributesFromDb,
  setCategoryChosen
) => {
  const highLevelCategory = e.target.value.split("/")[0];
  const highLevelCategoryAllData = categories.find(
    (category) => category.name === highLevelCategory
  );
  if (highLevelCategoryAllData && highLevelCategoryAllData.attrs) {
    setAttributesFromDb(highLevelCategoryAllData.attrs);
  } else {
    setAttributesFromDb([]);
  }
  setCategoryChosen(e.target.value);
};

export const setValuesForAttrFromDb = (e, attrValue, attributesFromDb) => {
  let selectedAttr = attributesFromDb.find(
    (item) => item.key === e.target.value
  );
  let valuesForAttrKeys = attrValue.current;
  if (selectedAttr && selectedAttr.value.length > 0) {
    while (valuesForAttrKeys.options.length) {
      valuesForAttrKeys.remove(0);
    }
    valuesForAttrKeys.options.add(new Option("Choose attribute value"));
    selectedAttr.value.map((item) => {
      valuesForAttrKeys.add(new Option(item));
      return "";
    });
  }
};

export const setAttributesTableWrapper = (key, value, setAttributesTable) => {
  setAttributesTable((attr) => {
    if (attr.length !== 0) {
      let keyExistsInOldTable = false;
      let modifiedTable = attr.map((item) => {
        if (item.key === key) {
          keyExistsInOldTable = true;
          item.value = value;
          return item;
        } else {
          return item;
        }
      });
      if (keyExistsInOldTable) return [...modifiedTable];
      else return [...modifiedTable, { key: key, value: value }];
    } else {
      return [{ key: key, value: value }];
    }
  });
};
