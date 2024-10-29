const express = require("express");
const authController = require("./auth.controller");

const authRouter = express.Router();

authRouter.post("/register", authController.register);
authRouter.post("/login", authController.login);
authRouter.get("/me", authController.getMe);

module.exports = authRouter;