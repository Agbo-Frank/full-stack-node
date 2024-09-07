"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
exports.default = {
    createPlan: [
        (0, express_validator_1.body)("name").notEmpty().withMessage("Plan name is required"),
        (0, express_validator_1.body)("rate").notEmpty().withMessage("Rate is required").isNumeric().withMessage("Must be a number"),
        (0, express_validator_1.body)("min_price").notEmpty().withMessage("Mininum price is required").isNumeric().withMessage("Mininum price must be a number"),
        (0, express_validator_1.body)("max_price").notEmpty().withMessage("Maximum price is required").isNumeric().withMessage("Maximum price must be a number"),
    ],
    sendMails: [
        (0, express_validator_1.body)("to").notEmpty().withMessage("Recipient email is required").isEmail().withMessage("Invalid email address"),
        (0, express_validator_1.body)("subject").notEmpty().withMessage("Subject is required"),
        (0, express_validator_1.body)("message").notEmpty().withMessage("Message is required")
    ]
};
//# sourceMappingURL=validator.js.map