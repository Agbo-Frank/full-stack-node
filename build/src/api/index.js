"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const routes_1 = __importDefault(require("./user/routes"));
const routes_2 = __importDefault(require("./auth/routes"));
const routes_3 = __importDefault(require("./pages/routes"));
const routes_4 = __importDefault(require("./investment/routes"));
const routes_5 = __importDefault(require("./admin/routes"));
const guard_1 = __importDefault(require("../middleware/guard"));
const is_admin_1 = __importDefault(require("../middleware/is-admin"));
function default_1(app) {
    app.use("/", routes_3.default);
    app.use("/user", guard_1.default, routes_1.default);
    app.use("/auth", routes_2.default);
    app.use("/investment", routes_4.default);
    app.use("/admin", guard_1.default, is_admin_1.default, routes_5.default);
}
//# sourceMappingURL=index.js.map