const Validator = require("fastest-validator");

const v = new Validator();

const schema = {
    firstName: {
        type: "string",
        min: 2,
        max: 100,
        trim: true,
    },
    lastName: {
        type: "string",
        min: 2,
        max: 100,
        trim: true,
    },
    jobTitle: {
        type: "string",
        min: 2,
        max: 100,
        trim: true,
    },
    email: {
        type: "email",
        max: 100,
        trim: true,
    },
    password: {
        type: "string",
        min: 6,
        max: 24,
        trim: true,
    },
    confirmPassword: {
        type: "equal",
        field: "password",
    },

    $$strict: true,
};

const check = v.compile(schema);

module.exports = check;