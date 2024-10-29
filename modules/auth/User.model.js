const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 2,
    },
    lastName: {
        type: String,
        required: true,
        minLength: 2,
    },
    jobTitle: {
        type: String,
        required: true,
        minLength: 2,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["USER", "ADMIN"],
        default: "USER",
    },
}, {timestamps: true});

const model = mongoose.models.User || mongoose.model("User", schema);

module.exports = model;