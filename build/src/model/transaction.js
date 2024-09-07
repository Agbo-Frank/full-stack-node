"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dayjs_1 = __importDefault(require("dayjs"));
const mongoose_1 = require("mongoose");
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
const tx = new mongoose_1.Schema({
    user: String,
    type: String,
    currency: String,
    amount: Number,
    hash: String,
    network: String,
    status: String,
    description: String,
    recipient: { type: String },
    created_at: {
        type: String,
        get(v) {
            return (0, dayjs_1.default)(v).format("DD MMM YYYY");
        }
    }
}, {
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at"
    },
});
tx.plugin(mongoose_paginate_v2_1.default);
const Transaction = (0, mongoose_1.model)("transaction", tx);
exports.default = Transaction;
//# sourceMappingURL=transaction.js.map