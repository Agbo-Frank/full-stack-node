"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
exports.default = {
    donation: [
        (0, express_validator_1.body)("amount").notEmpty().withMessage("Amount is required").isNumeric().withMessage("Must be a number"),
        (0, express_validator_1.body)("hash").notEmpty().withMessage("transaction hash is required"),
        (0, express_validator_1.body)("email").optional({ checkFalsy: true }).isEmail().withMessage("Invalid email address"),
    ],
};
//# sourceMappingURL=validator.js.map