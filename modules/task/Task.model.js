const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    undertaking: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
    },
    manager: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
    },
    status: {
        type: String,
        enum: ["waiting", "accepted", "rejected", "canceled", "done"],
        required: true,
    },
    text: {
        type: String,
        minLength: 3,
        maxLength: 9000,
        required: true,
    },
    dueDate: {
        type: Date,
        required: true,
    },
    deadLine: {
        type: Date,
        required: true,
    },
    attach: {
        type: String,
        required: true,
    },
}, {timestamps: true});

const model = mongoose.models.Task || mongoose.model("Task", schema);

module.exports = model;