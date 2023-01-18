const { createServer } = require("http");
const { Server } = require("socket.io");
const express = require("express");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const app = express();

const httpServer = createServer(app);
global.io = new Server(httpServer);

app.use(express.json());
app.use(fileUpload());
app.use(cookieParser());

io.on("connection", (socket) => {
  socket.on("client sends message", (msg) => {
    socket.broadcast.emit("server sends message from client to admin", {
      message: msg,
    });
  });
  socket.on("admin sends message", ({ message }) => {
    socket.broadcast.emit("server sends message from admin to client", message);
  });
});

const apiRoutes = require("./routes/apiRoutes");

// mongodb connection
const connectDB = require("./config/db");
connectDB();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api", apiRoutes);

app.use((error, req, res, next) => {
  if (process.env.NODE_ENV === "development") {
    console.log(error);
  }
  next(error);
});

app.use((error, req, res, next) => {
  if (process.env.NODE_ENV === "development") {
    res.status(500).json({
      message: error.message,
      stack: error.stack,
    });
  } else {
    res.status(500).json({
      message: error.message,
    });
  }
});

const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
