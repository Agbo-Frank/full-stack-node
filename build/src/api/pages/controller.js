"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const transaction_1 = __importDefault(require("../../model/transaction"));
const helpers_1 = require("../../utility/helpers");
const referral_1 = __importDefault(require("../../model/referral"));
const config_1 = require("../../utility/config");
const plans_1 = __importDefault(require("../../model/plans"));
const investment_1 = __importDefault(require("../../model/investment"));
const numeral_1 = __importDefault(require("numeral"));
const dayjs_1 = __importDefault(require("dayjs"));
const axios_1 = __importDefault(require("axios"));
const articles_1 = __importDefault(require("../../model/articles"));
const getNews = async () => {
    try {
        const response = await axios_1.default.get('https://newsapi.org/v2/everything', {
            params: {
                q: 'California wildfires',
                sortBy: 'publishedAt',
                language: 'en',
                apiKey: config_1.NEWAPI_API_KEY,
            },
        });
        return response.data.articles;
    }
    catch (error) {
        console.error('Error fetching updates:', error.message);
    }
};
class Controller {
    async home(req, res) {
        const plans = await plans_1.default.find();
        return res.render('index', { data: plans });
    }
    async donate(req, res) {
        try {
            let data = [];
            const articles = await articles_1.default.findOne();
            if (!articles || (0, dayjs_1.default)().isAfter((0, dayjs_1.default)(articles === null || articles === void 0 ? void 0 : articles.due_date))) {
                let result = await getNews();
                result = result.filter(a => (a === null || a === void 0 ? void 0 : a.title) !== "[Removed]").slice(0, 10);
                const payload = {
                    articles: JSON.stringify(result),
                    due_date: (0, dayjs_1.default)().add(12, "hours").toISOString()
                };
                if (articles)
                    await articles.updateOne(payload);
                else
                    await articles_1.default.create(payload);
                data = result;
            }
            else {
                data = JSON.parse(articles.articles);
            }
            const timestamp = (0, dayjs_1.default)().format("DD MMM YYYY");
            const formatDate = (date) => (0, dayjs_1.default)(date).format("DD MMM YYYY");
            return res.render('donate', { timestamp, formatDate, articles: data });
        }
        catch (error) {
            console.log(error);
        }
    }
    async login(req, res) {
        return res.render('login');
    }
    async fogetpassword(req, res) {
        return res.render('foget-password');
    }
    async resetpassword(req, res) {
        const { token } = req === null || req === void 0 ? void 0 : req.query;
        if ((0, helpers_1.isEmpty)(token)) {
            return res.redirect('/login');
        }
        return res.render('reset-password', { token });
    }
    async verifypassword(req, res) {
        return res.render('verify-password');
    }
    async realestate(req, res) {
        return res.render('real-estate');
    }
    async forex(req, res) {
        return res.render('forex');
    }
    async aboutus(req, res) {
        return res.render('about');
    }
    async commodities(req, res) {
        return res.render('commodities');
    }
    async stocks(req, res) {
        return res.render('stocks');
    }
    async cryptocurrencies(req, res) {
        return res.render('cryptocurrencies');
    }
    async faqs(req, res) {
        return res.render('faq');
    }
    async indices(req, res) {
        return res.render('indices');
    }
    async register(req, res) {
        let referral_code = null;
        if (!(0, helpers_1.isEmpty)(req.params.id)) {
            referral_code = req.params.id;
        }
        return res.render('register', { referral_code });
    }
    async policy(req, res) {
        return res.render('policy');
    }
    async terms(req, res) {
        return res.render('terms');
    }
    async dashboard(req, res) {
        let data = await transaction_1.default.paginate({ user: req.user }, { sort: { created_at: "desc" } });
        const total_deposit = data.docs.filter(t => t.type === "deposit" && t.status === "approved").reduce((acc, tx) => (0, numeral_1.default)(acc).add(tx.amount).value(), 0);
        const total_withdraw = data.docs.filter(t => t.type === "withdraw" && t.status === "approved").reduce((acc, tx) => (0, numeral_1.default)(acc).add(tx.amount).value(), 0);
        return res.render('dashboard', { tx: data.docs, total_deposit, total_withdraw });
    }
    async transactions(req, res) {
        const { page, limit } = (0, helpers_1.pagingParams)(req);
        let data = await transaction_1.default.paginate({ user: req.user }, { page, limit, sort: { created_at: "desc" } });
        return res.render('transactions', { data });
    }
    async plans(req, res) {
        const plans = await plans_1.default.find();
        return res.render('plans', { data: plans });
    }
    async investments(req, res) {
        const { page, limit } = (0, helpers_1.pagingParams)(req);
        const data = await investment_1.default.paginate({ user: req.user }, { page, limit, sort: { created_at: "desc" } });
        console.log(data);
        return res.render('investments', { data });
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
        var _a;
        const link = config_1.APP_URL + "/register/" + ((_a = res.locals.user) === null || _a === void 0 ? void 0 : _a.referral_code);
        const data = await referral_1.default.find({ user: req.user, paid: false }).populate("referee", "first_name last_name");
        const balance = data.filter(d => d.completed).reduce((acc, d) => acc + d.reward, 0);
        const pending_balance = data.filter(d => !d.completed).reduce((acc, d) => acc + d.reward, 0);
        return res.render('referrals', { balance, pending_balance, data, link });
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