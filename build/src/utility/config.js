"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CLOUDINARY_API_SECRET = exports.CLOUDINARY_API_KEY = exports.CLOUDINARY_NAME = exports.NOTIFICATION_MAIL = exports.MAIL_PASS = exports.MAIL_USER = exports.MAIL_PORT = exports.MAIL_HOST = exports.MONGODB_URL = exports.JWT_SECRET_KEY = exports.PORT = exports.NODE_ENV = void 0;
require("dotenv/config");
exports.NODE_ENV = process.env.NODE_ENV;
exports.PORT = process.env.PORT;
exports.JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
exports.MONGODB_URL = process.env.MONGODB_URL;
exports.MAIL_HOST = process.env.MAIL_HOST;
exports.MAIL_PORT = process.env.MAIL_PORT;
exports.MAIL_USER = process.env.MAIL_USER;
exports.MAIL_PASS = process.env.MAIL_PASS;
exports.NOTIFICATION_MAIL = process.env.NOTIFICATION_MAIL;
exports.CLOUDINARY_NAME = process.env.CLOUDINARY_NAME;
exports.CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
exports.CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;
//# sourceMappingURL=config.js.map