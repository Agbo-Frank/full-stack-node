"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = __importDefault(require("./controller"));
const validator_1 = __importDefault(require("./validator"));
const router = (0, express_1.Router)();
router.post("/donation", validator_1.default.donation, controller_1.default.donation);
exports.default = router;
//# sourceMappingURL=routes.js.map