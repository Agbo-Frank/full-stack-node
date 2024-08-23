"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.guardValid = void 0;
exports.default = guard;
const express_validator_1 = require("express-validator");
const jwt_1 = __importDefault(require("../utility/jwt"));
function guard(req, res, next) {
    var _a;
    try {
        const token = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.jwt;
        if (!token)
            return res.redirect('/login');
        const decoded = jwt_1.default.verify(token);
        if (!decoded)
            return res.redirect('/login');
        req.user = decoded === null || decoded === void 0 ? void 0 : decoded.id;
        // req.role = decoded?.role;
        console.log(decoded);
        next();
    }
    catch (error) {
        console.log("error:", error);
        next(error);
    }
}
exports.guardValid = (0, express_validator_1.header)("authorization")
    .notEmpty().withMessage("Token is required")
    .customSanitizer(value => value === null || value === void 0 ? void 0 : value.replace('Bearer ', ''));
//# sourceMappingURL=guard.js.map