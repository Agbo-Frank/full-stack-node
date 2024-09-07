"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = __importDefault(require("./controller"));
const validator_1 = __importDefault(require("./validator"));
const guard_1 = __importDefault(require("../../middleware/guard"));
const router = (0, express_1.Router)();
router.put("/profile", guard_1.default, controller_1.default.update);
router.post("/avatar", guard_1.default, controller_1.default.uploadAvatar);
router.post("/change-password", guard_1.default, validator_1.default.changePassword, controller_1.default.changePassword);
router.post("/withdraw", guard_1.default, validator_1.default.withdraw, controller_1.default.withdraw);
router.post("/referral/withdraw", guard_1.default, controller_1.default.referalWithdrawl);
router.post("/deposit", guard_1.default, validator_1.default.deposit, controller_1.default.deposit);
router.post("/contact", validator_1.default.contact, controller_1.default.contact);
exports.default = router;
//# sourceMappingURL=routes.js.map