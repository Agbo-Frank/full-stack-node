"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const plan = new mongoose_1.Schema({
    name: String,
    description: String,
    rate: Number,
    duration: Number,
    max_price: { type: Number, default: 0 },
    min_price: { type: Number, default: 0 }
});
plan.set('toObject', { getters: true });
const Plan = (0, mongoose_1.model)("plan", plan);
exports.default = Plan;
//# sourceMappingURL=plans.js.map