const express = require("express");
const authController = require("./auth.controller");
const authMiddleware = require("./../../middlewares/auth.middleware");

const authRouter = express.Router();

authRouter.post("/register", authController.register);
authRouter.post("/login", authController.login);
authRouter.get("/me", authMiddleware, authController.getMe);

module.exports = authRouter;