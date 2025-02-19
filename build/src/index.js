"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./utility/config");
const app_1 = __importDefault(require("./app"));
const mongoose_1 = __importDefault(require("mongoose"));
const logger_1 = __importDefault(require("./utility/logger"));
const logger = new logger_1.default("server");
mongoose_1.default.connect(config_1.MONGODB_URL, { autoIndex: false })
    .then(async () => {
    console.log("MongoDB connected successfully...");
    app_1.default.listen(config_1.PORT, () => logger.log(`Application runing on port ${config_1.PORT}...`));
})
    .catch((err) => console.log("MongoDB Error just occured " + err));
//# sourceMappingURL=index.js.map