"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.maskAddress = exports.getPrice = exports.extractFilters = exports.pagingParams = exports.responsHandler = exports.validateRequest = exports.maskEmail = exports.isEmpty = exports.compareStrings = exports.randAlphaNum = void 0;
exports.randNum = randNum;
const express_validator_1 = require("express-validator");
const service_error_1 = require("./service-error");
const axios_1 = __importDefault(require("axios"));
function randNum(len = 4) {
    const numbers = '0123456789';
    let randomCode = '';
    for (let i = 0; i < len; i++) {
        const randomIndex = Math.floor(Math.random() * numbers.length);
        randomCode += numbers.charAt(randomIndex);
    }
    return randomCode;
}
const randAlphaNum = (len = 6) => {
    const char = 'ABCDEFGHIJKLMNOPQRSUVWXYZ0123456789';
    let randomCode = '';
    for (let i = 0; i < len; i++) {
        const randomIndex = Math.floor(Math.random() * char.length);
        randomCode += char.charAt(randomIndex);
    }
    return randomCode;
};
exports.randAlphaNum = randAlphaNum;
const compareStrings = (str1, str2) => {
    return (str1 === null || str1 === void 0 ? void 0 : str1.toLowerCase().trim()) === (str2 === null || str2 === void 0 ? void 0 : str2.toLowerCase().trim());
};
exports.compareStrings = compareStrings;
const isEmpty = (mixedVar) => {
    let undef;
    let key;
    let i;
    let len;
    const emptyValues = [undef, null, false, 0, '', '0', 'null', 'undefined'];
    for (i = 0, len = emptyValues.length; i < len; i++) {
        if (mixedVar === emptyValues[i] || typeof mixedVar == 'undefined') {
            return true;
        }
    }
    if (typeof mixedVar === 'object' && !(mixedVar instanceof Date)) {
        for (key in mixedVar) {
            if (mixedVar.hasOwnProperty(key)) {
                return false;
            }
        }
        return true;
    }
    return false;
};
exports.isEmpty = isEmpty;
const maskEmail = (email) => {
    const [username, domain] = email.split('@');
    const mask = username.slice(0, 4) + '*'.repeat(Math.floor(username.length / 2)) + username.charAt(username.length - 1);
    return mask + '@' + domain;
};
exports.maskEmail = maskEmail;
const validateRequest = (req) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        let message = errors.array()[0].msg;
        throw new service_error_1.UnprocessableContent(message, errors.array());
    }
};
exports.validateRequest = validateRequest;
const responsHandler = (res, message, status = 200, data = null) => {
    res.status(status).json({
        status: /^4/.test(status.toString()) ? "failed" : "success",
        message,
        data
    });
};
exports.responsHandler = responsHandler;
const pagingParams = (req) => {
    var _a, _b, _c, _d, _e;
    const limit = ((_a = req.query) === null || _a === void 0 ? void 0 : _a.limit) ? parseInt(`${(_b = req.query) === null || _b === void 0 ? void 0 : _b.limit}`) : 25;
    const page = ((_c = req.query) === null || _c === void 0 ? void 0 : _c.page) ? parseInt(`${(_d = req.query) === null || _d === void 0 ? void 0 : _d.page}`) < 1 ? 1 : parseInt(`${(_e = req.query) === null || _e === void 0 ? void 0 : _e.page}`) : 1;
    return { limit, page, ...req.query };
};
exports.pagingParams = pagingParams;
const extractFilters = (payload, fields, searchable_fields = []) => {
    const proccessed = [];
    const filter = Object.entries(payload);
    for (let i = 0; i < filter.length; i++) {
        if (!fields.includes(filter[i][0]))
            continue;
        else if (filter[i][0] === "search") {
            proccessed.push({
                $or: searchable_fields.map(field => ({
                    [field]: { $regex: new RegExp(`${filter[i][1]}`), $options: "i" }
                }))
            });
        }
        else
            proccessed.push({ [filter[i][0]]: filter[i][1] });
    }
    return proccessed;
};
exports.extractFilters = extractFilters;
const getPrice = async (base, quote) => {
    try {
        const param = new URLSearchParams();
        param.append("ids", base.join(","));
        param.append("vs_currencies", quote.join(","));
        param.append("precision", "full");
        const { data } = await axios_1.default.get(`https://api.coingecko.com/api/v3/simple/price?${param.toString()}`);
        return data;
    }
    catch (error) {
        return error === null || error === void 0 ? void 0 : error.response;
    }
};
exports.getPrice = getPrice;
const maskAddress = (address) => {
    return (0, exports.isEmpty)(address) ? address : (address === null || address === void 0 ? void 0 : address.slice(0, 5)) + '*'.repeat(4) + address.slice(-5);
};
exports.maskAddress = maskAddress;
//# sourceMappingURL=helpers.js.map