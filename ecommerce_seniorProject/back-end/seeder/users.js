const bcrypt = require("bcryptjs");
const ObjectId = require("mongodb").ObjectId;
const users = [
  {
    name: "admin",
    lastName: "admin",
    email: "admin@admin.com",
    password: bcrypt.hashSync("admin@admin.com", 10),
    isAdmin: true,
  },
  {
    _id: ObjectId("6315be844798fb5a5940bc2f"),
    name: "tony",
    lastName: "chamoun",
    email: "tony@chamoun.com",
    password: bcrypt.hashSync("tony@chamoun.com", 10),
  },
];

module.exports = users;
