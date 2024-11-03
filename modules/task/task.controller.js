const {isValidObjectId} = require("mongoose");
const taskModel = require("./Task.model");
const userModel = require("./../auth/User.model");
const taskValidator = require("./task.validator");

exports.create = async (req, res) => {
    try {
        const validationResult = taskValidator(req.body);
        if (validationResult !== true) return res.status(422).json(validationResult);

        const {undertaking, text} = req.body;

        const isValidID = isValidObjectId(undertaking);
        if (!isValidID) return res.status(422).json({message: "undertaking is not valid"});

        const undertakingUser = await userModel.findOne({
            _id: undertaking,
        });
        if (!undertakingUser) return res.status(404).json({message: "undertaking not found"});

        await taskModel.create({
            undertaking,
            manager: req.user._id,
            status: "waiting",
            text,
            attach: req.file.filename,
        });

        res.status(201).json({
            message: "task created successfully.",
        });

    } catch (err) {
        console.log(`task controller, create err: ${err}`);
        return res.status(500).json({
            message: err.message,
        });
    }
};

exports.getAll = async (req, res) => {
};

exports.getOne = async (req, res) => {
};

exports.update = async (req, res) => {
};

exports.remove = async (req, res) => {
};