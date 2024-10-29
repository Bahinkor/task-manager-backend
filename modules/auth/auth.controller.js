const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("./User.model");
const registerValidator = require("./register.validator");

exports.register = async (req, res) => {
    try {
        const validationResult = registerValidator(req.body);
        if (validationResult !== true) return res.status(422).json(validationResult);

        const {
            firstName,
            lastName,
            jobTitle,
            email,
            password,
        } = req.body;

        const isEmailExist = await userModel.findOne({
            email: email.toLowerCase(),
        });
        if (isEmailExist) return res.status(409).json({message: "Email already exists"});

        const countOfUsers = await userModel.countDocuments();
        const hashedPassword = await bcrypt.hashSync(password, 12);

        await userModel.create({
            firstName,
            lastName,
            jobTitle,
            email: email.toLowerCase(),
            password: hashedPassword,
            role: countOfUsers > 0 ? "USER" : "ADMIN",
        });

        const accessToken = jwt.sign({email: email.toLowerCase()}, process.env.JWT_SECRET, {
            algorithm: "HS256",
            expiresIn: "30 day",
        });

        return res.status(201).json({accessToken});

    } catch (err) {
        console.log(`auth controller, register error: ${err}`);
        return res.status(500).json({
            message: err.message,
        });
    }
};

exports.login = async (req, res) => {
};

exports.getMe = async (req, res) => {
};