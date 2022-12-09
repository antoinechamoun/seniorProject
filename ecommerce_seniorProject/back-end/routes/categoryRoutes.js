const express = require("express");
const router = express.Router();
const {
  getCategories,
  newCategory,
  deleteCategory,
  saveAttribute,
} = require("../controllers/categoryController");

router.get("/", getCategories);
router.post("/", newCategory);
router.delete("/:category", deleteCategory);
router.post("/attrs", saveAttribute);

module.exports = router;
