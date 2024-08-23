"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = __importDefault(require("./controller"));
const validator_1 = __importDefault(require("./validator"));
const router = (0, express_1.Router)();
router.get("/profile", controller_1.default.profile);
router.put("/profile", controller_1.default.update);
router.post("/change-password", validator_1.default.changePassword, controller_1.default.changePassword);
router.post("/withdraw", validator_1.default.withdraw, controller_1.default.withdraw);
router.post("/deposit", validator_1.default.deposit, controller_1.default.deposit);
// router.get("/transactions",  cltr.transactions)
exports.default = router;
//# sourceMappingURL=routes.js.map