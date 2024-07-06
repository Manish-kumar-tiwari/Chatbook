const express = require("express");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const messageRoutes = require("./routes/messageRoutes");
const connectDb = require("./config/db");
const cookieParser = require("cookie-parser");
const path = require("path");
const cors = require("cors");
dotenv.config();
const { app, server } = require("./socket/socket");

connectDb();

const corsOption = {
  origin: "http://localhost:3000",
  credentials: true,
};
app.use(cors(corsOption));

app.use(cookieParser());
app.use(express.json());
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/message", messageRoutes);

app.use(express.static(path.join(__dirname, "./client/build")));
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname,"./client/build/index.html"));
});

const PORT = process.env.PORT;

server.listen(PORT, () => {
  console.log(`Server is Listining at Port ${PORT}`);
});
