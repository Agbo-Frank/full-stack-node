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
class Controller {
    async users(req, res, next) {
        try {
            const { page, limit } = (0, helpers_1.pagingParams)(req);
            const filters = (0, helpers_1.extractFilters)(req.query, ['search', 'email', 'first_name', 'last_name'], ['email', 'first_name', 'last_name']);
            const data = await user_1.default.paginate({ $and: filters.length > 0 ? filters : [{}] }, {
                page, limit,
                sort: { created_at: "desc" },
            });
            return (0, helpers_1.responsHandler)(res, "Users retrieved successfully", http_status_codes_1.StatusCodes.OK, data);
        }
        catch (error) {
            next(error);
        }
    }
    async investments(req, res, next) {
        try {
            const { page, limit } = (0, helpers_1.pagingParams)(req);
            const filters = (0, helpers_1.extractFilters)(req.query, ['search', 'email', 'first_name', 'last_name'], ['email', 'first_name', 'last_name']);
            const data = await user_1.default.paginate({ $and: filters.length > 0 ? filters : [{}] }, {
                page, limit,
                sort: { created_at: "desc" },
            });
            return (0, helpers_1.responsHandler)(res, "Users retrieved successfully", http_status_codes_1.StatusCodes.OK, data);
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
            return (0, helpers_1.responsHandler)(res, "Transactions retrieved successfully", http_status_codes_1.StatusCodes.OK, data);
        }
        catch (error) {
            next(error);
        }
    }
    async plans(req, res, next) {
        try {
            const data = await plans_1.default.find();
            return (0, helpers_1.responsHandler)(res, "Transactions retrieved successfully", http_status_codes_1.StatusCodes.OK, data);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.default = new Controller();
//# sourceMappingURL=controller.js.map