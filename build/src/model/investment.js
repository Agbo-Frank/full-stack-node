"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.investment_status = void 0;
const mongoose_1 = require("mongoose");
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
exports.investment_status = Object.freeze({
    "PENDING": "pending",
    "CANCELED": "canceled",
    "RUNNING": "running",
    "SUSPENSION": "suspension",
    "WITHDRAWN": "withdrawn"
});
const investmentSchema = new mongoose_1.Schema({
    plan_name: String,
    plan_id: String,
    user: String,
    capital: { type: Number, default: 0 },
    profit: { type: Number, default: 0 },
    status: {
        type: String,
        enum: Object.values(exports.investment_status),
        default: exports.investment_status.PENDING
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});
investmentSchema.plugin(mongoose_paginate_v2_1.default);
const Investment = (0, mongoose_1.model)("investment", investmentSchema);
exports.default = Investment;
//# sourceMappingURL=investment.js.map