const express = require("express");
const {
  registerCtrl,
  loginCtrl,
  logoutCtrl,
  getOtherUsers,
} = require("../controllers/userCtrl");
const isAuthenticated = require("../middlewares/isAuthenticated");

const routes = express.Router();

routes.post("/register", registerCtrl);
routes.post("/login", loginCtrl);
routes.get("/logout", logoutCtrl);
routes.get("/", isAuthenticated, getOtherUsers);

module.exports = routes;
