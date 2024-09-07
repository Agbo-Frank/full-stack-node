"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../../utility/helpers");
const user_1 = __importDefault(require("../../model/user"));
const http_status_codes_1 = require("http-status-codes");
const transaction_1 = __importDefault(require("../../model/transaction"));
const plans_1 = __importDefault(require("../../model/plans"));
const investment_1 = __importDefault(require("../../model/investment"));
const mail_1 = __importDefault(require("../../utility/mail"));
const service_error_1 = require("../../utility/service-error");
const numeral_1 = __importDefault(require("numeral"));
class Controller {
    async users(req, res, next) {
        const { page, limit } = (0, helpers_1.pagingParams)(req);
        const filters = (0, helpers_1.extractFilters)(req.query, ['search', 'email', 'first_name', 'last_name'], ['email', 'first_name', 'last_name']);
        let data = await user_1.default.paginate({ $and: filters.length > 0 ? filters : [{}] }, {
            page, limit,
            sort: { created_at: "desc" },
        });
        return res.render('users', { data });
    }
    async editUser(req, res, next) {
        var _a, _b, _c, _d, _e, _f;
        try {
            const user = await user_1.default.findByIdAndUpdate((_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a._id, {
                first_name: (_b = req === null || req === void 0 ? void 0 : req.body) === null || _b === void 0 ? void 0 : _b.first_name,
                last_name: (_c = req === null || req === void 0 ? void 0 : req.body) === null || _c === void 0 ? void 0 : _c.last_name,
                password: (_d = req === null || req === void 0 ? void 0 : req.body) === null || _d === void 0 ? void 0 : _d.password,
                balance: (_e = req === null || req === void 0 ? void 0 : req.body) === null || _e === void 0 ? void 0 : _e.balance,
                address: (_f = req === null || req === void 0 ? void 0 : req.body) === null || _f === void 0 ? void 0 : _f.address
            }, { new: true });
            return (0, helpers_1.responsHandler)(res, "User updated successfully", http_status_codes_1.StatusCodes.OK, user);
        }
        catch (error) {
            next(error);
        }
    }
    async investments(req, res, next) {
        try {
            const { page, limit } = (0, helpers_1.pagingParams)(req);
            const filters = (0, helpers_1.extractFilters)(req.query, ['search', 'email', 'first_name', 'last_name'], ['email', 'first_name', 'last_name']);
            const data = await investment_1.default.paginate({ $and: filters.length > 0 ? filters : [{}] }, {
                page, limit,
                sort: { created_at: "desc" },
            });
            return res.render('all-investments', { data });
        }
        catch (error) {
            next(error);
        }
    }
    async editInvestment(req, res, next) {
        var _a, _b, _c, _d, _e;
        try {
            const tx = await investment_1.default.findByIdAndUpdate((_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a._id, {
                plan: (_b = req === null || req === void 0 ? void 0 : req.body) === null || _b === void 0 ? void 0 : _b.plan,
                capital: (_c = req === null || req === void 0 ? void 0 : req.body) === null || _c === void 0 ? void 0 : _c.capital,
                profit: (_d = req === null || req === void 0 ? void 0 : req.body) === null || _d === void 0 ? void 0 : _d.profit,
                status: (_e = req === null || req === void 0 ? void 0 : req.body) === null || _e === void 0 ? void 0 : _e.status
            }, { new: true });
            return (0, helpers_1.responsHandler)(res, "Investment updated successfully", http_status_codes_1.StatusCodes.OK, tx);
        }
        catch (error) {
            next(error);
        }
    }
    async transactions(req, res, next) {
        try {
            const { page, limit } = (0, helpers_1.pagingParams)(req);
            const filters = (0, helpers_1.extractFilters)(req.query, ['search', 'type', 'hash'], ['recipient', 'type', 'hash']);
            const data = await transaction_1.default.paginate({ $and: filters.length > 0 ? filters : [{}] }, {
                page, limit,
                sort: { created_at: "desc" },
            });
            return res.render('all-transactions', { data });
        }
        catch (error) {
            next(error);
        }
    }
    async editTxn(req, res, next) {
        var _a, _b, _c, _d, _e, _f, _g;
        try {
            const transaction = await transaction_1.default.findById((_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a._id);
            if (!transaction)
                throw new service_error_1.NotFoundException("Transaction not found");
            const user = await user_1.default.findById(transaction.user);
            const tx = await transaction_1.default.findByIdAndUpdate((_b = req === null || req === void 0 ? void 0 : req.body) === null || _b === void 0 ? void 0 : _b._id, {
                type: (_c = req === null || req === void 0 ? void 0 : req.body) === null || _c === void 0 ? void 0 : _c.type,
                amount: (_d = req === null || req === void 0 ? void 0 : req.body) === null || _d === void 0 ? void 0 : _d.amount,
                currency: (_e = req === null || req === void 0 ? void 0 : req.body) === null || _e === void 0 ? void 0 : _e.currency,
                status: (_f = req === null || req === void 0 ? void 0 : req.body) === null || _f === void 0 ? void 0 : _f.status,
                description: (_g = req === null || req === void 0 ? void 0 : req.body) === null || _g === void 0 ? void 0 : _g.description,
            }, { new: true });
            if (tx.status === "approved") {
                if (tx.type === "deposit") {
                    user.balance = (0, numeral_1.default)(user.balance).add(tx.amount).value();
                }
                if (tx.type === "withdraw") {
                    user.balance = (0, numeral_1.default)(user.balance).subtract(tx.amount).value();
                }
            }
            if (["withdrawal", "deposit"].includes(tx.type) &&
                ["approved", "declined"].includes(tx.status)) {
                mail_1.default.onTxUpdate({
                    user: transaction.user,
                    to: user === null || user === void 0 ? void 0 : user.email,
                    name: user === null || user === void 0 ? void 0 : user.first_name,
                    status: tx.status,
                    type: tx.type,
                    ref: tx.id,
                    amount: tx.amount,
                    network: tx.network
                });
            }
            return (0, helpers_1.responsHandler)(res, "Transaction updated successfully", http_status_codes_1.StatusCodes.OK, tx);
        }
        catch (error) {
            next(error);
        }
    }
    async plans(req, res, next) {
        const data = await plans_1.default.find();
        return res.render('all-plans', { data });
    }
    async sendmails(req, res, next) {
        return res.render('send-mail');
    }
    async sendMails(req, res, next) {
        try {
            (0, helpers_1.validateRequest)(req);
            await mail_1.default.sendWithTemplate(req.body);
            return (0, helpers_1.responsHandler)(res, "Message sent successfully", http_status_codes_1.StatusCodes.OK);
        }
        catch (error) {
            next(error);
        }
    }
    async createPlan(req, res, next) {
        try {
            (0, helpers_1.validateRequest)(req);
            const data = await plans_1.default.create(req.body);
            return (0, helpers_1.responsHandler)(res, "Plan created successfully", http_status_codes_1.StatusCodes.CREATED, data);
        }
        catch (error) {
            next(error);
        }
    }
    async editPlan(req, res, next) {
        var _a, _b, _c, _d, _e;
        try {
            const plan = await plans_1.default.findByIdAndUpdate((_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a._id, {
                name: (_b = req === null || req === void 0 ? void 0 : req.body) === null || _b === void 0 ? void 0 : _b.name,
                rate: (_c = req === null || req === void 0 ? void 0 : req.body) === null || _c === void 0 ? void 0 : _c.rate,
                max_price: (_d = req === null || req === void 0 ? void 0 : req.body) === null || _d === void 0 ? void 0 : _d.max_price,
                min_price: (_e = req === null || req === void 0 ? void 0 : req.body) === null || _e === void 0 ? void 0 : _e.min_price
            }, { new: true });
            return (0, helpers_1.responsHandler)(res, "Plan updated successfully", http_status_codes_1.StatusCodes.OK, plan);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.default = new Controller();
//# sourceMappingURL=controller.js.map