const Validator = require("fastest-validator");

const v = new Validator();

const schema = {
    undertaking: {
        type: "string",
    },
    text: {
        type: String,
        min: 3,
        max: 9000,
    }
};

const check = v.compile(schema);

module.exports = check;