"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
exports.default = {
    create: [
        (0, express_validator_1.body)("plan_id").notEmpty().withMessage("select plan").isMongoId().withMessage("Invalid plan id"),
        (0, express_validator_1.body)("amount").notEmpty().withMessage("Amount is required").isInt().withMessage("Amount must be numeric")
    ],
    withdraw: (0, express_validator_1.body)("id").notEmpty().withMessage("select investment").isMongoId().withMessage("Invalid plan id")
};
//# sourceMappingURL=validator.js.map