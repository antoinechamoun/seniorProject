const express = require("express");
const app = express();
const port = 3000;

const apiRoutes = require("./routes/apiRoutes");

// mongodb connection
const connectDB = require("./config/db");
connectDB();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api", apiRoutes);

app.use((error, req, res) => {
  console.log(error);
  next(error);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
