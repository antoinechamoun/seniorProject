const Category = require("../models/CategoryModel");

const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find({}).sort({ name: "asc" }).orFail();
    res.json(categories);
  } catch (error) {
    next(error);
  }
};

const newCategory = async (req, res, next) => {
  try {
    const { category } = req.body;
    if (!category) {
      res.status(400).send("Category input required");
    }
    const categoryExists = await Category.findOne({ name: category });
    if (categoryExists) {
      res.status(400).send("Category already exists!");
    } else {
      const categoryCreated = await Category.create({ name: category });
      res.status(201).send({ categoryCreated });
    }
  } catch (error) {
    next(error);
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    if (req.params.category !== "Choose category") {
      const categoryExists = await Category.findOne({
        name: decodeURI(req.params.category),
      });
      if (!categoryExists) {
        res.status(400).send("Category does not exist!");
      } else {
        await categoryExists.remove();
        res.json({ categoryDeleted: true });
      }
    }
  } catch (error) {
    next(error);
  }
};

const saveAttribute = async (req, res, next) => {
  const { key, val, categoryChosen } = req.body;
  if (!key || !val || !categoryChosen) {
    res.status(400).send("All inputs are required");
  }
  try {
    const category = categoryChosen.split("/")[0];
    const categoryExists = await Category.findOne({ name: category }).orFail();
    if (categoryExists.attrs.length > 0) {
      let keyDoesNotExistsInDatabase = false;
      categoryExists.attrs.map((item, id) => {
        if (item.key === key) {
          keyDoesNotExistsInDatabase = true;
          let copyAttributesValues = [...categoryExists.attrs[id].value];
          copyAttributesValues.push(val);
          let newAttributeValues = [...new Set(copyAttributesValues)];
          categoryExists.attrs[id].value = newAttributeValues;
        } else {
          categoryExists.attrs.push({ key, value: [val] });
        }
      });
    } else {
      categoryExists.attrs.push({ key, value: [val] });
    }
    await categoryExists.save();
    let cat = await Category.find({}).sort({ name: "asc" });
    return res.status(201).json({ categoriesUpdated: cat });
  } catch (error) {
    next(error);
  }
};

module.exports = { getCategories, newCategory, deleteCategory, saveAttribute };
