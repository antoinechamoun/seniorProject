const Product = require("../models/ProductModel");

const getProducts = (req, res) => {
  res.send("Handling products search");
};

module.exports = getProducts;
