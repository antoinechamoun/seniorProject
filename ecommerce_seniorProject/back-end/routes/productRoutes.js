const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Handling product routes search");
});

module.exports = router;
