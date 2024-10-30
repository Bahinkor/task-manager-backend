const Validator = require("fastest-validator");

const v = new Validator();

const schema = {
    email: {
        type: "email",
        trim: true,
    },
    password: {
        type: "string",
        min: 6,
        max: 24,
        trim: true,
    },

    $$strict: true,
};

const check = v.compile(schema);

module.exports = check;