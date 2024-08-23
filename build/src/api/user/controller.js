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
            if ("avatar" in payload && !(0, helpers_1.compareStrings)(payload === null || payload === void 0 ? void 0 : payload.avatar, user === null || user === void 0 ? void 0 : user.avatar)) {
                const result = await cloudinary_1.default.uploader.upload(payload.avatar, { folder: '/okafor/photos' });
                if (result)
                    payload.avatar = result === null || result === void 0 ? void 0 : result.secure_url;
            }
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
            console.log("body: ", req.body, req.user);
            const { amount, hash, currency } = req.body;
            const tx = await transaction_1.default.create({
                user: req.user,
                type: "deposit",
                currency,
                amount, hash,
                status: "pending",
                description: "Wallet funding",
            });
            return (0, helpers_1.responsHandler)(res, "Deposit intiated, wait for confirmation ", http_status_codes_1.StatusCodes.OK, tx);
        }
        catch (error) {
            console.log("errr:", error);
            // next(error)
        }
    }
    async withdraw(req, res, next) {
        try {
            (0, helpers_1.validateRequest)(req);
            const { amount, address } = req.body;
            const user = await user_1.default.findById(req.user);
            if (!user)
                throw new service_error_1.BadRequestException("user not found");
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
            return (0, helpers_1.responsHandler)(res, "Deposit intiated, wait for confirmation ", http_status_codes_1.StatusCodes.OK, tx);
        }
        catch (error) {
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
}
exports.default = new Controller();
//# sourceMappingURL=controller.js.map