const jwt = require("jsonwebtoken");
const userModel = require("./../modules/auth/User.model");

module.exports = async (req, res, next) => {
    try {
        const {token} = req.headers;
        const {email} = jwt.verify(token, process.env.JWT_SECRET);

        const user = await userModel.findOne({email}, "-password -__v").lean();
        if (!user) return res.status(404).json({message: "user not found"});

        req.user = user;
        next();

    } catch (err) {
        return res.status(500).json({
            message: err.message,
        });
    }
};