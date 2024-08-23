"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const planSchema = new mongoose_1.Schema({
    name: String,
    description: String,
    rate: Number,
    max_price: { type: Number, default: 0 },
    min_price: { type: Number, default: 0 }
});
const Plan = (0, mongoose_1.model)("plan", planSchema);
exports.default = Plan;
//# sourceMappingURL=plans.js.map