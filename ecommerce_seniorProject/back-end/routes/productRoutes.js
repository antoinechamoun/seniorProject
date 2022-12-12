const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProductById,
  getBestSellers,
  adminGetProducts,
} = require("../controllers/productController");

router.get("/", getProducts);
router.get("/search/:searchQuery", getProducts);
router.get("/category/:categoryName", getProducts);
router.get("/category/:categoryName/search/:searchQuery", getProducts);
router.get("/bestsellers", getBestSellers);
router.get("/get-one/:id", getProductById);

// admin
router.get("/admin", adminGetProducts);

module.exports = router;
