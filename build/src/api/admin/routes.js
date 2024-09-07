"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = __importDefault(require("./controller"));
const validator_1 = __importDefault(require("./validator"));
const router = (0, express_1.Router)();
router.get("/users", controller_1.default.users);
router.get("/transactions", controller_1.default.transactions);
router.get("/plans", controller_1.default.plans);
router.get("/investments", controller_1.default.investments);
router.get("/sendmail", controller_1.default.sendmails);
router.post("/sendmail", validator_1.default.sendMails, controller_1.default.sendMails);
router.post("/plan", validator_1.default.createPlan, controller_1.default.createPlan);
router.put("/users", controller_1.default.editUser);
router.put("/plans", controller_1.default.editPlan);
router.put("/transactions", controller_1.default.editTxn);
router.put("/investments", controller_1.default.editInvestment);
exports.default = router;
//# sourceMappingURL=routes.js.map