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
class Controller {
    async users(req, res, next) {
        const { page, limit } = (0, helpers_1.pagingParams)(req);
        const filters = (0, helpers_1.extractFilters)(req.query, ['search', 'email', 'first_name', 'last_name'], ['email', 'first_name', 'last_name']);
        let data = await user_1.default.paginate({ $and: filters.length > 0 ? filters : [{}] }, {
            page, limit,
            sort: { updated_at: "desc" },
        });
        return res.render('users', { data });
    }
    async editUser(req, res, next) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
        try {
            if ((_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.reset) {
                const txs = await transaction_1.default.find({ user: (_b = req === null || req === void 0 ? void 0 : req.body) === null || _b === void 0 ? void 0 : _b._id, status: "approved" });
                const total_deposit = txs.filter(tx => tx.type === "deposit").reduce((acc, tx) => acc + tx.amount, 0);
                const total_withdrawal = txs.filter(tx => tx.type === "withdraw").reduce((acc, tx) => acc + tx.amount, 0);
                const commission = txs.filter(tx => tx.type === "commission").reduce((acc, tx) => acc + tx.amount, 0);
                const charge = txs.filter(tx => tx.type === "charge").reduce((acc, tx) => acc + tx.amount, 0);
                req.body.total_withdrawal = total_withdrawal;
                req.body.total_deposit = total_deposit;
                req.body.balance = (total_deposit + commission) - (charge + total_withdrawal);
                req.body.earnings = commission;
            }
            console.log(req === null || req === void 0 ? void 0 : req.body);
            const user = await user_1.default.findByIdAndUpdate((_c = req === null || req === void 0 ? void 0 : req.body) === null || _c === void 0 ? void 0 : _c._id, {
                first_name: (_d = req === null || req === void 0 ? void 0 : req.body) === null || _d === void 0 ? void 0 : _d.first_name,
                last_name: (_e = req === null || req === void 0 ? void 0 : req.body) === null || _e === void 0 ? void 0 : _e.last_name,
                role: (_f = req === null || req === void 0 ? void 0 : req.body) === null || _f === void 0 ? void 0 : _f.role,
                password: (_g = req === null || req === void 0 ? void 0 : req.body) === null || _g === void 0 ? void 0 : _g.password,
                balance: (_h = req === null || req === void 0 ? void 0 : req.body) === null || _h === void 0 ? void 0 : _h.balance,
                earnings: (_j = req === null || req === void 0 ? void 0 : req.body) === null || _j === void 0 ? void 0 : _j.earnings,
                total_withdrawal: (_k = req === null || req === void 0 ? void 0 : req.body) === null || _k === void 0 ? void 0 : _k.total_withdrawal,
                total_deposit: (_l = req === null || req === void 0 ? void 0 : req.body) === null || _l === void 0 ? void 0 : _l.total_deposit,
                address: (_m = req === null || req === void 0 ? void 0 : req.body) === null || _m === void 0 ? void 0 : _m.address,
                verified: (_o = req === null || req === void 0 ? void 0 : req.body) === null || _o === void 0 ? void 0 : _o.verified
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
                populate: { path: "user", select: "email" },
                sort: { updated_at: "desc" },
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
                sort: { updated_at: "desc" },
                populate: { path: "user", select: "email" }
            });
            return res.render('all-transactions', { data, formatDate: helpers_1.formatDate });
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
            // if (tx.status === "approved") {
            //   if (tx.type === "deposit") {
            //     user.total_deposit = numeral(user.total_deposit).add(tx.amount).value()
            //   }
            //   if (tx.type === "withdraw") {
            //     user.total_deposit = numeral(user.total_deposit).subtract(tx.amount).value()
            //   }
            //   await user.save()
            // }
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
            console.log(error);
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