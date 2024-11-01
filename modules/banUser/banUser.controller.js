const banUserModel = require('./BanUser.model');

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
};

exports.remove = async (req, res) => {
};