"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const transaction_1 = __importDefault(require("../../model/transaction"));
const helpers_1 = require("../../utility/helpers");
class Controller {
    async home(req, res) {
        return res.render('index');
    }
    async login(req, res) {
        return res.render('login');
    }
    async register(req, res) {
        return res.render('register');
    }
    async policy(req, res) {
        return res.render('policy');
    }
    async dashboard(req, res) {
        return res.render('dashboard');
    }
    async transactions(req, res) {
        // console.log(req.user )
        // let txs = [{jhdfkjd: "", kjdfj: ""}];
        const { page, limit } = (0, helpers_1.pagingParams)(req);
        const txs = await transaction_1.default.paginate({}, { page, limit });
        return res.render('transactions', { txs });
    }
    async plans(req, res) {
        return res.render('plans');
    }
    async investments(req, res) {
        return res.render('investments');
    }
    async settings(req, res) {
        return res.render('settings');
    }
    async deposit(req, res) {
        return res.render('deposit');
    }
    async withdraw(req, res) {
        return res.render('withdraw');
    }
    async contact(req, res) {
        return res.render('contact');
    }
    async referrals(req, res) {
        return res.render('referrals');
    }
    async kyc(req, res) {
        return res.render('kyc');
    }
    async forgetpassword(req, res) {
        return res.render('forget-password');
    }
    async error(req, res) {
        return res.render('error');
    }
}
exports.default = new Controller();
//# sourceMappingURL=controller.js.map