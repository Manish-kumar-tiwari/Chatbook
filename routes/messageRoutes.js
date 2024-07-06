const express = require("express");
const { sendMessage, getMessage } = require("../controllers/messageCtrl");
const isAuthenticated = require("../middlewares/isAuthenticated");
const routes = express.Router();

routes.post("/sendMessage/:id", isAuthenticated, sendMessage);
routes.get("/:id", isAuthenticated, getMessage);

module.exports = routes;
