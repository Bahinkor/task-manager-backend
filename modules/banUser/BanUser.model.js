const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
    },
}, {timestamps: true});

const model = mongoose.models.BanUser || mongoose.model("BanUser", schema);

module.exports = model;