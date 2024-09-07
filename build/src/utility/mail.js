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
const jwt_1 = __importDefault(require("./jwt"));
const ejs_1 = __importDefault(require("ejs"));
const path_1 = __importDefault(require("path"));
class MailService {
    constructor() {
        this.txmail_content = {
            'withdraw.declined': {
                title: "Withdrawal Request Declined",
                subtitle: `
      <p>Dear <%= name %>,</p>
      <br />
      <p>We regret to inform you that your recent withdrawal request has been declined.</p>
      <%- order %>
      <p>If you need further assistance or if you believe this is an error, please contact our support team at <a href="mailto:support@apexstack.org">support@apexstack.org</a> .</p>
      `
            },
            'withdraw.approved': {
                title: "Your Withdrawal Request has been Approved",
                subtitle: `
      <p>Dear <%= name %>,</p>
      <br />
      <p>We are pleased to inform you that your recent withdrawal request has been approved successfully</p>
      <%- order %>
      <p>The amount of <%= amount %> has been processed and should be reflected in your account shortly. If you have any questions or require further assistance, please reach out to us at <a href="mailto:support@apexstack.org">support@apexstack.org</a>.</p>
      `
            },
            'deposit.approved': {
                title: "Your Deposit Request has been Approved",
                subtitle: `
      <p>Dear <%= name %>,</p>
      <br />
      <p>We are pleased to inform you that your recent deposit has been successfully approved.</p>
      <%- order %>
      <p>If you have any questions or need further assistance, feel free to contact us at <a href="mailto:support@apexstack.org">support@apexstack.org</a> .</p>
      `
            },
            'deposit.declined': {
                title: "Deposit Request Declined",
                subtitle: `
      <p>Dear <%= name %>,</p>
      <br />
      <p>We regret to inform you that your recent deposit attempt has been declined.</p>
      <%- order %>
      <p>Please review the details of your transaction and ensure that all information is correct. If you need further assistance or if you believe this is an error, please contact our support team at <a href="mailto:support@apexstack.org">support@apexstack.org</a> .</p>
      `
            }
        };
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
            await this.config.sendMail({
                from: "noreply@artversehub.com",
                to: config_1.NOTIFICATION_MAIL.split(","),
                ...payload
            });
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
    async sendWithTemplate(payload) {
        const { to, subject, message } = payload;
        const html = await ejs_1.default.renderFile(path_1.default.join("views", "email-template", "general.ejs"), { text: message, subject, timestamp: (0, dayjs_1.default)().format("DD MMM YYYY") });
        await this.send({
            from: config_1.MAIL_USER,
            to, subject, html
        });
    }
    async onRegistration(email, name) {
        try {
            const html = await ejs_1.default.renderFile(path_1.default.join("views", "email-template", "registration.ejs"), { name, timestamp: (0, dayjs_1.default)().format("DD MMM YYYY") });
            await this.send({
                from: config_1.MAIL_USER,
                to: email,
                subject: `Welcome to Apexstack ${name}`,
                html
            });
            return { message: "Mail sent", status: true };
        }
        catch (error) {
            return { message: "Mail failed", status: false };
        }
    }
    async onDeposit(email, name, order) {
        try {
            const html = await ejs_1.default.renderFile(path_1.default.join("views", "email-template", "deposit.ejs"), {
                name,
                timestamp: (0, dayjs_1.default)().format("DD MMM YYYY"),
                ...order
            });
            await this.send({
                from: config_1.MAIL_USER,
                to: email,
                subject: `Deposit Request Received`,
                html
            });
            return { message: "Mail sent", status: true };
        }
        catch (error) {
            return { message: "Mail failed", status: false };
        }
    }
    async onTxUpdate(payload) {
        const { to, name, status, type, ref, amount, network } = payload;
        const request = ejs_1.default.render(`
      <p>Your request is as follows:</p>
      <div>
        <p>- Ref: <%= "*".repeat(5) + ref.slice(-5) %></p>
        <p>- Amount: <%= amount %></p>
        <p style="text-transform: uppercase;">- Currency: <%= network %></p>
      </div>
    `, { ref, amount, network });
        console.log(request, `${type}.${status}`);
        const { title: subject, subtitle } = this.txmail_content[`${type}.${status}`];
        const message = ejs_1.default.render(subtitle, { order: request, name });
        try {
            await this.sendWithTemplate({ message, to, subject });
            return { message: "Mail sent", status: true };
        }
        catch (_a) {
            return { message: "Mail failed", status: false };
        }
    }
    async onWithdrawal(email, name, order) {
        try {
            const html = await ejs_1.default.renderFile(path_1.default.join("views", "email-template", "withdraw.ejs"), {
                name,
                timestamp: (0, dayjs_1.default)().format("DD MMM YYYY"),
                ...order
            });
            await this.send({
                from: config_1.MAIL_USER,
                to: email,
                subject: `Withdrawal Request Received`,
                html
            });
            return { message: "Mail sent", status: true };
        }
        catch (error) {
            return { message: "Mail failed", status: false };
        }
    }
    async resetLink(email) {
        try {
            const user = await user_1.default.findOne({ email });
            if (!user)
                throw new service_error_1.NotFoundException("User not found");
            const link = config_1.APP_URL + "/reset-password?token=" + jwt_1.default.create({ id: user === null || user === void 0 ? void 0 : user.id, role: user.role }, { expiresIn: 60 * 10 }); //10 mins
            const html = await ejs_1.default.renderFile(path_1.default.join("views", "email.ejs"), { link, name: user === null || user === void 0 ? void 0 : user.first_name, timestamp: (0, dayjs_1.default)().format("DD MMM YYYY") });
            await this.send({
                from: config_1.MAIL_USER,
                to: email,
                subject: "Reset link",
                html
            });
            return { message: "Reset link has been sent to your email " + (0, helpers_1.maskEmail)(email) };
        }
        catch (error) {
            if (error instanceof service_error_1.ServiceError)
                throw error;
            throw new service_error_1.BadRequestException(`Failed to send reset link, verify this email ${(0, helpers_1.maskEmail)(email)} is correct`);
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