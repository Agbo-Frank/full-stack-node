"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = __importDefault(require("./controller"));
const validator_1 = __importDefault(require("./validator"));
const router = (0, express_1.Router)();
router.post("/", validator_1.default.create, controller_1.default.create);
router.post("/withdraw", validator_1.default.withdraw, controller_1.default.withdraw);
exports.default = router;
//# sourceMappingURL=routes.js.map