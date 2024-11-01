const banUserModel = require("./BanUser.model");
const userModel = require("./../auth/User.model");
const {isValidObjectId} = require("mongoose");

exports.getAll = async (req, res) => {
    try {
        const bannedUsers = await banUserModel.find({})
            .populate("user", "-password -__v").lean();

        res.json({...bannedUsers});

    } catch (err) {
        console.log(`ban user controller, get all error: ${err}`);
        return res.status(500).json({
            message: err.message,
        });
    }
};

exports.banUser = async (req, res) => {
    try {
        const {banUser} = req.body;

        const isValidObjectID = isValidObjectId(banUser);
        if (!isValidObjectID) return res.status(422).json({message: "id is not valid."});

        const user = await userModel.findOne({_id: banUser});
        if (!user) return res.status(404).json({message: "user not found."});

        const isUserAdmin = user.role === "ADMIN";
        if (isUserAdmin) return res.status(403).json({message: "this user is admin. to ban, please remove it from admin first."});

        await banUserModel.create({
            user: user._id,
        });

        res.status(201).json({
            message: "User banned successfully.",
        });

    } catch (err) {
        console.log(`ban user controller, ban user error: ${err}`);
        return res.status(500).json({
            message: err.message,
        });
    }
};

exports.remove = async (req, res) => {
};