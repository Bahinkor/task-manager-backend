const express = require("express");
const taskController = require("./task.controller");
const authMiddleware = require("./../../middlewares/auth.middleware");
const isAdminMiddleware = require("./../../middlewares/isAdmin.middleware");
const attachUploader = require("./../../middlewares/attach.uploader");

const taskRouter = express.Router();

taskRouter.use(authMiddleware);

taskRouter.route("/")
    .post(isAdminMiddleware, attachUploader.single("attach"), taskController.create)
    .get(isAdminMiddleware, taskController.getAll);

taskRouter.route("/:taskID")
    .get(taskController.getOne)
    .put(isAdminMiddleware, attachUploader.single("attach"), taskController.update)
    .delete(isAdminMiddleware, taskController.remove);

module.exports = taskRouter;