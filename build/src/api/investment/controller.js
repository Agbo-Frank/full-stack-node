"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const investment_1 = __importStar(require("../../model/investment"));
const plans_1 = __importDefault(require("../../model/plans"));
const user_1 = __importDefault(require("../../model/user"));
const service_error_1 = require("../../utility/service-error");
const helpers_1 = require("../../utility/helpers");
const http_status_codes_1 = require("http-status-codes");
const numeral_1 = __importDefault(require("numeral"));
const transaction_1 = __importDefault(require("../../model/transaction"));
const referral_1 = __importDefault(require("../../model/referral"));
const dayjs_1 = __importDefault(require("dayjs"));
class Controller {
    async create(req, res, next) {
        try {
            (0, helpers_1.validateRequest)(req);
            const { plan_id, amount } = req.body;
            const plan = await plans_1.default.findById(plan_id);
            if (!plan)
                throw new service_error_1.NotFoundException("Plan not found");
            if (amount < plan.min_price || (plan.max_price !== null && amount > plan.max_price)) {
                throw new service_error_1.BadRequestException(`Amount should be within the range of $${plan.min_price} - $${plan.max_price}`);
            }
            const user = await user_1.default.findById(req.user);
            if (amount > user.balance) {
                throw new service_error_1.BadRequestException("Insufficient funds");
            }
            await investment_1.default.create({
                plan: plan === null || plan === void 0 ? void 0 : plan.id,
                capital: amount,
                user: req === null || req === void 0 ? void 0 : req.user,
                status: investment_1.investment_status.active
            });
            user.total_deposit = (0, numeral_1.default)(user === null || user === void 0 ? void 0 : user.total_deposit).subtract(amount).value();
            user.balance = (0, numeral_1.default)(user === null || user === void 0 ? void 0 : user.balance).add(amount).value();
            await user.save();
            await transaction_1.default.create({
                user: req === null || req === void 0 ? void 0 : req.user,
                amount, currency: "USD",
                status: "approved",
                description: `Investment initialization: ${plan === null || plan === void 0 ? void 0 : plan.name}`,
                type: "charge"
            });
            const referral = await referral_1.default.findOne({ referee: user.id });
            if (referral && referral.completed) {
                referral.updateOne({ completed: true });
            }
            return (0, helpers_1.responsHandler)(res, "Investment created successfully", http_status_codes_1.StatusCodes.CREATED);
        }
        catch (error) {
            next(error);
        }
    }
    async investments(req, res, next) {
        try {
            const data = await investment_1.default.paginate({ user: req.user }, { sort: { created_at: "desc" } });
            return (0, helpers_1.responsHandler)(res, "Investment retrieved successfully", http_status_codes_1.StatusCodes.OK, data);
        }
        catch (error) {
            next(error);
        }
    }
    async withdraw(req, res, next) {
        try {
            const inv = await investment_1.default.findById(req.body.id);
            if (!inv)
                throw new service_error_1.NotFoundException("Investment not found");
            if (inv.status !== investment_1.investment_status.active) {
                throw new service_error_1.NotFoundException("Investment is " + inv.status);
            }
            const plan = await plans_1.default.findById(inv.plan);
            if (!plan)
                throw new service_error_1.BadRequestException("Plan not found");
            if ((0, dayjs_1.default)().diff(inv.created_at, "days") < plan.duration) {
                throw new service_error_1.BadRequestException(`Withdrawal allowed only after ${plan.duration} days of investment.`);
            }
            ;
            const user = await user_1.default.findById(req.user);
            if (!user)
                throw new service_error_1.NotFoundException("User not found");
            const amount = (0, numeral_1.default)(inv.capital).add(inv.profit).value();
            user.total_deposit = (0, numeral_1.default)(amount).add(user.total_deposit).value();
            user.balance = (0, numeral_1.default)(user.balance).subtract(amount).value();
            user.earnings = (0, numeral_1.default)(user.earnings).subtract(inv.profit).value();
            inv.status = investment_1.investment_status.completed;
            await inv.save();
            await user.save();
            await transaction_1.default.create({
                user: req.user,
                type: "commission",
                currency: "USD",
                amount,
                status: "approved",
                description: "Investment withdrawal"
            });
            return (0, helpers_1.responsHandler)(res, "Investment retrieved successfully", http_status_codes_1.StatusCodes.OK);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.default = new Controller();
//# sourceMappingURL=controller.js.map