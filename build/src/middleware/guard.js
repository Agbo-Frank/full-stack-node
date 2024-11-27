"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = guard;
const helpers_1 = require("../utility/helpers");
const jwt_1 = __importDefault(require("../utility/jwt"));
const user_1 = __importDefault(require("../model/user"));
async function guard(req, res, next) {
    var _a;
    try {
        (0, helpers_1.validateRequest)(req);
        const token = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.jwt;
        if (!token)
            return res.redirect('/login');
        const decoded = jwt_1.default.verify(token);
        if (!decoded)
            return res.redirect('/login');
        req.user = decoded === null || decoded === void 0 ? void 0 : decoded.id;
        const user = await user_1.default.findById(decoded === null || decoded === void 0 ? void 0 : decoded.id);
        req.role = user === null || user === void 0 ? void 0 : user.role;
        next();
    }
    catch (error) {
        next(error);
    }
}
//# sourceMappingURL=guard.js.map