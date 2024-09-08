"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const error_handler_1 = __importDefault(require("./middleware/error-handler"));
const api_1 = __importDefault(require("./api"));
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const logger_1 = __importDefault(require("./utility/logger"));
const check_user_1 = __importDefault(require("./middleware/check-user"));
const logger = new logger_1.default("server");
// initiateJobs()
const app = (0, express_1.default)();
// app.set('trust proxy', 1);
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)({
    origin: '*',
    credentials: true,
    optionsSuccessStatus: 200
}));
app.use("/assets", express_1.default.static(path_1.default.join('public')));
app.set('views', path_1.default.join('views'));
app.set('view engine', 'ejs');
// app.locals.cache = true;
app.use((req, res, next) => {
    logger.log("info", { method: req === null || req === void 0 ? void 0 : req.method, endpoint: req === null || req === void 0 ? void 0 : req.url });
    res.setHeader("Content-Security-Policy", "img-src * data:;");
    // res.setHeader('Cache-Control', 'public, max-age=86400');
    next();
});
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json({ limit: "10mb" }));
app.use(express_1.default.urlencoded({ extended: false }));
app.use(check_user_1.default);
(0, api_1.default)(app);
app.use(error_handler_1.default);
app.disable('x-powered-by');
exports.default = app;
//# sourceMappingURL=app.js.map