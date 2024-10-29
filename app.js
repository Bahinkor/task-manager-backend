const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());
app.use(helmet());


// not fount error handler
app.use((req, res) => {
    return res.status(404).json({
        message: "Not Found",
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