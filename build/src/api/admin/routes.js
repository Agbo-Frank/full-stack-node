"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = __importDefault(require("./controller"));
const router = (0, express_1.Router)();
router.get("/users", controller_1.default.users);
router.get("/investments", controller_1.default.investments);
router.get("/transactions", controller_1.default.transactions);
exports.default = router;
//# sourceMappingURL=routes.js.map