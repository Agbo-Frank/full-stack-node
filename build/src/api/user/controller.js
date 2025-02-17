"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../../utility/helpers");
const user_1 = __importDefault(require("../../model/user"));
const service_error_1 = require("../../utility/service-error");
const http_status_codes_1 = require("http-status-codes");
const cloudinary_1 = __importDefault(require("../../utility/cloudinary"));
const transaction_1 = __importDefault(require("../../model/transaction"));
const numeral_1 = __importDefault(require("numeral"));
const referral_1 = __importDefault(require("../../model/referral"));
const mail_1 = __importDefault(require("../../utility/mail"));
class Controller {
    async profile(req, res, next) {
        try {
            const user = await user_1.default.findById(req.user).select("-password");
            if (!user)
                throw new service_error_1.NotFoundException("user not found");
            return (0, helpers_1.responsHandler)(res, "User profile retrieved successfully", http_status_codes_1.StatusCodes.OK, user);
        }
        catch (error) {
            next(error);
        }
    }
    async update(req, res, next) {
        try {
            (0, helpers_1.validateRequest)(req);
            const payload = req.body;
            let user = await user_1.default.findById(req.user);
            if (!user)
                throw new service_error_1.NotFoundException("user not found");
            user = await user_1.default.findByIdAndUpdate(req.user, {
                first_name: payload === null || payload === void 0 ? void 0 : payload.first_name,
                last_name: payload === null || payload === void 0 ? void 0 : payload.last_name,
                avatar: payload === null || payload === void 0 ? void 0 : payload.avatar,
                phone_number: payload === null || payload === void 0 ? void 0 : payload.phone_number,
                address: payload === null || payload === void 0 ? void 0 : payload.address
            }, { new: true });
            return (0, helpers_1.responsHandler)(res, "User profile updated successfully", http_status_codes_1.StatusCodes.CREATED, user);
        }
        catch (error) {
            next(error);
        }
    }
    async uploadAvatar(req, res, next) {
        try {
            (0, helpers_1.validateRequest)(req);
            const result = await cloudinary_1.default.uploader.upload(req === null || req === void 0 ? void 0 : req.body.image, { folder: '/apexstack/photos' });
            if (!result)
                throw new service_error_1.BadRequestException(`Unable to upload avatar`);
            await user_1.default.updateOne({ _id: req.user }, { avatar: result === null || result === void 0 ? void 0 : result.secure_url });
            return (0, helpers_1.responsHandler)(res, "Profile pics uploaded successfully", http_status_codes_1.StatusCodes.OK, { url: result === null || result === void 0 ? void 0 : result.secure_url });
        }
        catch (error) {
            next(error);
        }
    }
    async changePassword(req, res, next) {
        try {
            (0, helpers_1.validateRequest)(req);
            const { old_password, new_password } = req.body;
            let user = await user_1.default.findById(req.user);
            if (!user)
                throw new service_error_1.NotFoundException("user not found");
            if (old_password !== user.password) {
                throw new service_error_1.BadRequestException(`Incorrect password`);
            }
            await user.updateOne({ password: new_password });
            return (0, helpers_1.responsHandler)(res, "Password updated successfully");
        }
        catch (error) {
            next(error);
        }
    }
    async transactions(req, res, next) {
        try {
            const { page, limit } = (0, helpers_1.pagingParams)(req);
            const txs = await transaction_1.default.paginate({ user: req.user }, { page, limit });
            return (0, helpers_1.responsHandler)(res, "Transactions retrieved successfully", http_status_codes_1.StatusCodes.OK, txs);
        }
        catch (error) {
            next(error);
        }
    }
    async deposit(req, res, next) {
        try {
            (0, helpers_1.validateRequest)(req);
            const { amount, hash, network } = req.body;
            const user = await user_1.default.findById(req.user);
            if (!user)
                throw new service_error_1.NotFoundException("User not found");
            const tx = await transaction_1.default.create({
                user: req.user,
                type: "deposit",
                network, currency: "USD",
                amount, hash,
                status: "pending",
                description: "Wallet funding",
            });
            await mail_1.default.send({
                subject: "Confirm new deposit",
                text: `
          network: ${network}
          ref: ${tx.id}
          amount: ${amount}
          hash/id: ${hash}
        `
            });
            mail_1.default.onDeposit(user.email, user.first_name, { amount, currency: network, ref: "*".repeat(6) + tx.id.slice(-5) });
            return (0, helpers_1.responsHandler)(res, "Deposit intiated, wait for confirmation ", http_status_codes_1.StatusCodes.OK, tx);
        }
        catch (error) {
            console.log("errr:", error);
            next(error);
        }
    }
    async donation(req, res, next) {
        try {
            (0, helpers_1.validateRequest)(req);
            const { amount, hash, network } = req.body;
            await mail_1.default.send({
                subject: "Confirm new denotion",
                text: `
          network: ${network}
          amount: ${amount}
          hash/id: ${hash}
        `
            });
            // mail.onDeposit(
            //   user.email, user.first_name,
            //   { amount, currency: network, ref: "*".repeat(6) + tx.id.slice(-5) }
            // )
            return (0, helpers_1.responsHandler)(res, "Thanks for your generosity", http_status_codes_1.StatusCodes.OK);
        }
        catch (error) {
            console.log("errr:", error);
            next(error);
        }
    }
    async withdraw(req, res, next) {
        try {
            (0, helpers_1.validateRequest)(req);
            const { amount, currency, address } = req.body;
            const user = await user_1.default.findById(req.user);
            if (!user)
                throw new service_error_1.BadRequestException("user not found");
            if (!user.verified)
                throw new service_error_1.BadRequestException("Your KYC hasn't been verified");
            if (user.balance < Number(amount))
                throw new service_error_1.BadRequestException("Insufficient balance to withdraw");
            user.balance = (0, numeral_1.default)(user.balance).subtract(amount).value();
            await user.save();
            const tx = await transaction_1.default.create({
                user: user.id,
                type: "withdraw",
                status: "pending",
                recipient: address,
                amount: -amount,
                description: `Withdrawal request`
            });
            await mail_1.default.send({
                subject: "You have a new withdrawal request",
                text: `
          name: ${(user === null || user === void 0 ? void 0 : user.first_name) + " " + (user === null || user === void 0 ? void 0 : user.last_name)}
          ref: ${tx.id}
          currency: ${currency}
          amount: ${amount}
          address: ${address}
        `
            });
            mail_1.default.onWithdrawal(user.email, user.first_name, { amount, address, currency, ref: "*".repeat(6) + tx.id.slice(-5) });
            return (0, helpers_1.responsHandler)(res, "Deposit intiated, wait for confirmation ", http_status_codes_1.StatusCodes.OK, tx);
        }
        catch (error) {
            next(error);
        }
    }
    async referalWithdrawl(req, res, next) {
        try {
            const referral = await referral_1.default.find({ user: req.user, paid: false });
            const balance = referral.filter(d => !d.paid).reduce((acc, d) => acc + d.reward, 0);
            if (balance === 0)
                throw new service_error_1.BadRequestException("Low referral balance");
            const user = await user_1.default.findById(req.user);
            if (!user)
                throw new service_error_1.BadRequestException("user not found");
            user.balance = (0, numeral_1.default)(user.balance).add(balance).value();
            await user.save();
            await referral_1.default.updateMany({ user: req.user }, { paid: true });
            const tx = await transaction_1.default.create({
                user: user.id,
                type: "commission",
                status: "approved",
                amount: balance,
                description: `Referral earnings withdrawal`
            });
            return (0, helpers_1.responsHandler)(res, "Referral earnings withdrawal successful ", http_status_codes_1.StatusCodes.OK, tx);
        }
        catch (error) {
            console.log(error);
            next(error);
        }
    }
    async referrals(req, res, next) {
        try {
            const data = await referral_1.default.find({ user: req.user });
            const balance = data.reduce((acc, d) => acc + d.reward, 0);
            return (0, helpers_1.responsHandler)(res, "Referrals retrived successfully", http_status_codes_1.StatusCodes.OK, { balance, refferees: data });
        }
        catch (error) {
            next(error);
        }
    }
    async kyc(req, res, next) {
        try {
            const result = await cloudinary_1.default.uploader.upload(req === null || req === void 0 ? void 0 : req.body.image, { folder: '/apexstack/kyc' });
            if (!result)
                throw new service_error_1.BadRequestException(`Unable to upload avatar`);
            await user_1.default.updateOne({ _id: req.user }, { kyc_docs: result === null || result === void 0 ? void 0 : result.secure_url });
            return (0, helpers_1.responsHandler)(res, "KYC document sent for reveiw", http_status_codes_1.StatusCodes.OK, { url: result === null || result === void 0 ? void 0 : result.secure_url });
        }
        catch (error) {
            next(error);
        }
    }
    async contact(req, res, next) {
        try {
            (0, helpers_1.validateRequest)(req);
            const { message, email, name } = req.body;
            await mail_1.default.send({
                subject: "You have a new message",
                text: `
          name: ${name}
          email: ${email}
          message: ${message}
        `
            });
            return (0, helpers_1.responsHandler)(res, "Your message has been sent successfully", http_status_codes_1.StatusCodes.OK);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.default = new Controller();
//# sourceMappingURL=controller.js.map