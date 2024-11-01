const express = require("express");
const banUserController = require("./banUser.controller");
const authMiddleware = require("./../../middlewares/auth.middleware");
const isAdminMiddleware = require("./../../middlewares/isAdmin.middleware");

const banUserRouter = express.Router();

banUserRouter.use(authMiddleware);
banUserRouter.use(isAdminMiddleware);

banUserRouter.route("/")
    .get(banUserController.getAll);

banUserRouter.route("/:id")
    .post(banUserController.banUser)
    .delete(banUserController.remove);

module.exports = banUserRouter;