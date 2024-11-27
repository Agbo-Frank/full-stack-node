"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
exports.default = {
    changePassword: [
        (0, express_validator_1.body)("new_password").notEmpty().withMessage("New password is required"),
        (0, express_validator_1.body)("old_password").notEmpty().withMessage("Old password is required")
    ],
    deposit: [
        (0, express_validator_1.body)("amount").notEmpty().withMessage("Amount is required").isNumeric().withMessage("Must be a number"),
        (0, express_validator_1.body)("hash").notEmpty().withMessage("transaction hash is required")
    ],
    withdraw: [
        (0, express_validator_1.body)("amount").notEmpty().withMessage("Amount is required").isNumeric().withMessage("Must be a number").isInt({ min: 30 }).withMessage("Minimum withdrawal amount is $30"),
        (0, express_validator_1.body)("address").notEmpty().withMessage("Address is required")
    ],
    contact: [
        (0, express_validator_1.body)("name").notEmpty().withMessage("Full name is required"),
        (0, express_validator_1.body)("message").notEmpty().withMessage("Full name is required"),
        (0, express_validator_1.body)("email").notEmpty().withMessage("Email is required").isEmail().withMessage("Invalid email address")
    ]
};
//# sourceMappingURL=validator.js.map