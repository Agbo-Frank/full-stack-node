"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dayjs_1 = __importDefault(require("dayjs"));
const mongoose_1 = require("mongoose");
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
const user = new mongoose_1.Schema({
    first_name: String,
    last_name: String,
    referral_code: String,
    phone_number: String,
    address: String,
    avatar: String,
    kyc_docs: String,
    earnings: {
        type: Number,
        default: 0
    },
    verified: {
        type: Boolean,
        default: false
    },
    email: {
        type: String,
        lowercase: true,
        index: true,
        unique: true
    },
    balance: {
        type: Number,
        default: 0
    },
    total_withdrawal: {
        type: Number,
        default: 0
    },
    total_deposit: {
        type: Number,
        default: 0
    },
    role: {
        type: String,
        trim: true,
        lowercase: true,
        default: "user",
        enum: ["admin", "user"]
    },
    password: String,
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
    }
});
user.plugin(mongoose_paginate_v2_1.default);
const User = (0, mongoose_1.model)("user", user);
exports.default = User;
//# sourceMappingURL=user.js.map