"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = require("../utility/config");
const service_error_1 = require("../utility/service-error");
const helpers_1 = require("../utility/helpers");
const dayjs_1 = __importDefault(require("dayjs"));
const user_1 = __importDefault(require("../model/user"));
class MailService {
    constructor() {
        this.config = nodemailer_1.default.createTransport({
            //@ts-ignore
            host: config_1.MAIL_HOST,
            port: config_1.MAIL_PORT,
            secure: true,
            auth: {
                user: config_1.MAIL_USER,
                pass: config_1.MAIL_PASS,
            }
        });
    }
    async send(payload) {
        try {
            await this.config.sendMail({ from: "noreply@artversehub.com", ...payload });
        }
        catch (error) {
            console.log(error);
        }
    }
    async sendOTP(email) {
        try {
            const user = await user_1.default.findOne({ email });
            if (!user)
                throw new service_error_1.NotFoundException("User not found");
            const code = (0, helpers_1.randNum)();
            await this.send({
                from: config_1.MAIL_USER,
                to: email,
                subject: "OTP Verification",
                text: `Your One-time password is: ${code}`
            });
            await user.updateOne({ otp: code, otp_exp: (0, dayjs_1.default)().add(10, "minutes") });
            return { message: "OTP sent to yout mail " + (0, helpers_1.maskEmail)(email) };
        }
        catch (error) {
            if (error instanceof service_error_1.ServiceError)
                throw error;
            throw new service_error_1.BadRequestException(`Failed to send OTP, verify this email ${(0, helpers_1.maskEmail)(email)} is correct`);
        }
    }
    async verifyOTP(email, code) {
        const user = await user_1.default.findOne({ email });
        if (!user)
            throw new service_error_1.NotFoundException("User not found");
        return user;
    }
}
exports.default = new MailService();
//# sourceMappingURL=mail.js.map