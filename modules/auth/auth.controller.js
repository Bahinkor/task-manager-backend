const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("./User.model");
const banUserModel = require("./../banUser/BanUser.model");
const registerValidator = require("./register.validator");
const loginValidator = require("./login.validator");

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
    try {
        const validationResult = loginValidator(req.body);
        if (validationResult !== true) return res.status(422).json(validationResult);

        const {email, password} = req.body;

        const user = await userModel.findOne({
            email: email.toLowerCase(),
        });
        if (!user) return res.status(404).json({message: "user is not found"});

        const isUserBanned = await banUserModel.findOne({
            user: user._id,
        });
        if (isUserBanned) return res.status(403).json({message: "user is banned"});

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) return res.status(403).json({message: "email or password not valid"});

        const accessToken = jwt.sign({email: user.email}, process.env.JWT_SECRET, {
            algorithm: "HS256",
            expiresIn: "30 day",
        });

        return res.json({accessToken});

    } catch (err) {
        console.log(`auth controller, login error: ${err}`);
        return res.status(500).json({
            message: err.message,
        });
    }
};

exports.getMe = async (req, res) => {
};