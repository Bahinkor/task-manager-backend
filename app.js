const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const authRouter = require("./modules/auth/auth.router");
const banUserRouter = require("./modules/banUser/banUser.router");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());
app.use(helmet());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user/ban", banUserRouter);

// not fount error handler
app.use((req, res) => {
    return res.status(404).json({
        message: "API Route Not Found",
    });
});

// error handler middleware
app.use((err, req, res, next) => {
    return res.status(500).json({
        statusCode: err.status || "Uncertain",
        message: err.message || "Internal Server Error",
    });
});

module.exports = app;