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
        (0, express_validator_1.body)("amount").notEmpty().withMessage("Amount is required").isNumeric().withMessage("Must be a number"),
        (0, express_validator_1.body)("address").notEmpty().withMessage("Address is required").isEthereumAddress().withMessage("Invalid address")
    ]
};
//# sourceMappingURL=validator.js.map