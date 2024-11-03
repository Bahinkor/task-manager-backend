const Validator = require("fastest-validator");

const v = new Validator();

const schema = {
    undertaking: {
        type: "string",
    },
    text: {
        type: "string",
        min: 3,
        max: 9000,
    },
    dueDate: {
        type: "date",
    },
    deadLine: {
        type: "date",
    },
};

const check = v.compile(schema);

module.exports = check;