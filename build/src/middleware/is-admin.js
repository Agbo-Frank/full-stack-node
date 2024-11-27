"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = isAdmin;
function isAdmin(req, res, next) {
    try {
        if (req.role !== "admin")
            return res.redirect('/login');
        next();
    }
    catch (error) {
        next(error);
    }
}
//# sourceMappingURL=is-admin.js.map