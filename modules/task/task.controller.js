const {isValidObjectId} = require("mongoose");
const taskModel = require("./Task.model");
const userModel = require("./../auth/User.model");
const taskValidator = require("./task.validator");

exports.create = async (req, res) => {
    try {
        const validationResult = taskValidator(req.body);
        if (validationResult !== true) return res.status(422).json(validationResult);

        const {
            undertaking,
            text,
            dueDate,
            deadLine,
        } = req.body;

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
            dueDate,
            deadLine,
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
    try {
        const tasks = await taskModel.find({})
            .populate("undertaking", "-password -__v").populate("manager", "-password -__v").lean();

        res.json(tasks);

    } catch (err) {
        console.log(`task controller, get all err: ${err}`);
        return res.status(500).json({
            message: err.message,
        });
    }
};

exports.getOne = async (req, res) => {
    try {
        const {taskID} = req.params;

        const isValidID = isValidObjectId(taskID);
        if (!isValidID) return res.status(422).json({message: "taskID is not valid."});

        const task = await taskModel.findOne({
            _id: taskID,
        }).populate("undertaking", "-password -__v").populate("manager", "-password -__v").lean();
        if (!task) return res.status(404).json({message: "task not found."});

        if (req.user.role !== "ADMIN" && req.user._id !== task.undertaking) return res.status(403).json({message: "You do not have the required access."});

        res.json(...task);

    } catch (err) {
        console.log(`task controller, get one err: ${err}`);
        return res.status(500).json({
            message: err.message,
        });
    }
};

exports.update = async (req, res) => {
    try {
        const {taskID} = req.params;

        const isValidTaskID = isValidObjectId(taskID);
        if (!isValidTaskID) return res.status(422).json({message: "taskID is not valid."});

        const validationResult = taskValidator(req.body);
        if (validationResult !== true) return res.status(422).json(validationResult);

        const {
            undertaking,
            text,
            dueDate,
            deadLine,
            status,
        } = req.body;

        const isValidID = isValidObjectId(undertaking);
        if (!isValidID) return res.status(422).json({message: "undertaking is not valid"});

        const undertakingUser = await userModel.findOne({
            _id: undertaking,
        });
        if (!undertakingUser) return res.status(404).json({message: "undertaking not found"});

        const updatedTask = await taskModel.updateOne({_id: taskID}, {
            undertaking,
            text,
            dueDate,
            deadLine,
            status,
            attach: req.file.filename,
        });
        if (!updatedTask) return res.status(404).json({message: "task not found."});

        res.json({
            message: "task updated successfully.",
        });

    } catch (err) {
        console.log(`task controller, update err: ${err}`);
        return res.status(500).json({
            message: err.message,
        });
    }
};

exports.remove = async (req, res) => {
    try {
        const {taskID} = req.params;

        const isValidTaskID = isValidObjectId(taskID);
        if (!isValidTaskID) return res.status(422).json({message: "taskID is not valid."});

        const removedTask = await taskModel.findOneAndDelete({
            _id: taskID,
        });
        if (!removedTask) return res.status(404).json({message: "task not found."});

        res.json({
            message: "task removed successfully.",
        });

    } catch (err) {
        console.log(`task controller, remove err: ${err}`);
        return res.status(500).json({
            message: err.message,
        });
    }
};