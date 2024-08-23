"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = __importDefault(require("./controller"));
const guard_1 = __importDefault(require("../../middleware/guard"));
const router = (0, express_1.Router)();
router.get("/", controller_1.default.home);
router.get("/login", controller_1.default.login);
router.get("/register", controller_1.default.register);
router.get("/policy", controller_1.default.policy);
router.get("/dashboard", guard_1.default, controller_1.default.dashboard);
router.get("/transactions", guard_1.default, controller_1.default.transactions);
router.get("/plans", controller_1.default.plans);
router.get("/investments", controller_1.default.investments);
router.get("/settings", controller_1.default.settings);
router.get("/deposit", guard_1.default, controller_1.default.deposit);
router.get("/withdraw", controller_1.default.withdraw);
router.get("/contact", controller_1.default.contact);
router.get("/referrals", controller_1.default.referrals);
router.get("/kyc", controller_1.default.kyc);
router.get("/*", controller_1.default.error);
exports.default = router;
//# sourceMappingURL=routes.js.map