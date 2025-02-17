"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../../utility/helpers");
const user_1 = __importDefault(require("../../model/user"));
const service_error_1 = require("../../utility/service-error");
const jwt_1 = __importDefault(require("../../utility/jwt"));
const http_status_codes_1 = require("http-status-codes");
const mail_1 = __importDefault(require("../../utility/mail"));
const referral_1 = __importDefault(require("../../model/referral"));
class Controller {
    async login(req, res, next) {
        try {
            (0, helpers_1.validateRequest)(req);
            const { email, password } = req.body;
            let user = await user_1.default.findOne({ email });
            if (!user)
                throw new service_error_1.NotFoundException("User not found");
            if (password !== user.password)
                throw new service_error_1.BadRequestException(`Incorrect password`);
            const data = {
                access_token: jwt_1.default.create({ id: user === null || user === void 0 ? void 0 : user.id, role: user.role }),
                user: {
                    ...user.toJSON(),
                    password: null
                }
            };
            res.cookie("jwt", data.access_token, { httpOnly: true, maxAge: 3 * 24 * 60 * 60 * 1000 });
            return (0, helpers_1.responsHandler)(res, "User login successful", http_status_codes_1.StatusCodes.OK, data);
        }
        catch (error) {
            console.log(error);
            next(error);
        }
    }
    async register(req, res, next) {
        var _a, _b;
        try {
            (0, helpers_1.validateRequest)(req);
            const { email, password, phone_number, first_name, last_name } = req.body;
            let user = await user_1.default.findOne({ email });
            if (user)
                throw new service_error_1.BadRequestException("User with same email/username already exist");
            let referral = null;
            if ("referral_code" in req.body && !(0, helpers_1.isEmpty)((_a = req.body) === null || _a === void 0 ? void 0 : _a.referral_code)) {
                referral = await user_1.default.findOne({ referral_code: (_b = req.body) === null || _b === void 0 ? void 0 : _b.referral_code });
                if (!referral)
                    throw new service_error_1.NotFoundException("Invalid referral code");
            }
            const referral_code = await (0, helpers_1.generateCode)(email);
            user = new user_1.default({
                email,
                phone_number,
                password, first_name,
                last_name, referral_code,
            });
            await user.save();
            if (referral) {
                await referral_1.default.create({
                    user: referral.id,
                    referee: user.id,
                    reward: 10,
                    paid: false
                });
            }
            mail_1.default.onRegistration(email, first_name);
            return (0, helpers_1.responsHandler)(res, "Registration successful", http_status_codes_1.StatusCodes.CREATED);
        }
        catch (error) {
            console.log(error);
            next(error);
        }
    }
    async sendOTP(req, res, next) {
        try {
            (0, helpers_1.validateRequest)(req);
            const { email } = req.body;
            await mail_1.default.resetLink(email);
            return (0, helpers_1.responsHandler)(res, "OTP sent to yout mail " + (0, helpers_1.maskEmail)(email), http_status_codes_1.StatusCodes.OK);
        }
        catch (error) {
            next(error);
        }
    }
    async resetPassword(req, res, next) {
        try {
            (0, helpers_1.validateRequest)(req);
            const { password, token } = req.body;
            const decoded = jwt_1.default.verify(token);
            if (!decoded)
                return res.redirect('/login');
            await user_1.default.updateOne({ _id: decoded === null || decoded === void 0 ? void 0 : decoded.id }, { password });
            return (0, helpers_1.responsHandler)(res, "Password reset successfully", http_status_codes_1.StatusCodes.OK);
        }
        catch (error) {
            next(error);
        }
    }
    async logout(req, res, next) {
        res.cookie('jwt', '', { maxAge: 1 });
        return (0, helpers_1.responsHandler)(res, "Logout successful", http_status_codes_1.StatusCodes.OK);
    }
}
exports.default = new Controller();
//# sourceMappingURL=controller.js.map