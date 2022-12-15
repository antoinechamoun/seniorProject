const express = require("express");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const app = express();
const port = 3000;

app.use(express.json());
app.use(fileUpload());
app.use(cookieParser());
const apiRoutes = require("./routes/apiRoutes");

// mongodb connection
const connectDB = require("./config/db");
connectDB();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api", apiRoutes);

app.use((error, req, res, next) => {
  next(error);
});

app.use((error, req, res, next) => {
  console.log(error);
  res.status(500).json({
    message: error.message,
    stack: error.stack,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
