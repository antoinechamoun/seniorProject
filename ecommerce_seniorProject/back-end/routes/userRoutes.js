const express = require("express");
const router = express.Router();
const {
  getUser,
  registerUser,
  loginUser,
} = require("../controllers/userController");

router.post("/register", registerUser);
router.post("/login", loginUser);

// user logged in routes

// admin routes
router.get("/", getUser);

module.exports = router;
