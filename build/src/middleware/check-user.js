"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = checkUser;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../model/user"));
const config_1 = require("../utility/config");
async function checkUser(req, res, next) {
    var _a;
    res.locals.user = null;
    try {
        const token = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.jwt;
        if (!token)
            throw new Error("No token!");
        const decoded = jsonwebtoken_1.default.verify(token, config_1.JWT_SECRET_KEY);
        if (!decoded)
            throw new Error("Invalid token");
        const user = await user_1.default.findById(decoded.id);
        res.locals.user = user;
        res.locals.role = decoded.role;
        next();
    }
    catch (error) {
        next();
    }
}
;
//# sourceMappingURL=check-user.js.map