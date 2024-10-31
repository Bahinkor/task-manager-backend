const express = require("express");
const {isValidObjectId} = require("mongoose");
const banUserModel = require("./BanUser.model");
const banUserController = require("./banUser.controller");

const banUserRouter = express.Router();

banUserRouter.route("/")
    .get(banUserController.getAll)
    .post(banUserController.banUser)
    .delete(banUserController.remove);

module.exports = banUserRouter;