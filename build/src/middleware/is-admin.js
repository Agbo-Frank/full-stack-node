"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = isAdmin;
const service_error_1 = require("../utility/service-error");
function isAdmin(req, res, next) {
    try {
        if (req.role !== "admin")
            throw new service_error_1.UnauthorizedException("Unauthorized user");
        next();
    }
    catch (error) {
        next(error);
    }
}
//# sourceMappingURL=is-admin.js.map