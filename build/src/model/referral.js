"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dayjs_1 = __importDefault(require("dayjs"));
const mongoose_1 = require("mongoose");
const referral = new mongoose_1.Schema({
    user: String,
    referee: {
        type: mongoose_1.Types.ObjectId,
        ref: "user"
    },
    reward: { type: Number, default: 0 },
    completed: {
        type: Boolean,
        default: false
    },
    paid: {
        type: Boolean,
        default: false
    },
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
const Referral = (0, mongoose_1.model)("referral", referral);
exports.default = Referral;
//# sourceMappingURL=referral.js.map