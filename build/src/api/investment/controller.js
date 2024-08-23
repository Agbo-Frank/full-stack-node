"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const investment_1 = __importDefault(require("../../model/investment"));
const plans_1 = __importDefault(require("../../model/plans"));
const user_1 = __importDefault(require("../../model/user"));
const service_error_1 = require("../../utility/service-error");
const helpers_1 = require("../../utility/helpers");
const http_status_codes_1 = require("http-status-codes");
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
            return (0, helpers_1.responsHandler)(res, "investment created successfully", http_status_codes_1.StatusCodes.CREATED);
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
    async withdraw() {
    }
}
exports.default = new Controller();
//# sourceMappingURL=controller.js.map