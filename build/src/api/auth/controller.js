"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../../utility/helpers");
const user_1 = __importDefault(require("../../model/user"));
const service_error_1 = require("../../utility/service-error");
const jwt_1 = __importDefault(require("../../utility/jwt"));
const http_status_codes_1 = require("http-status-codes");
const mail_1 = __importDefault(require("../../utility/mail"));
const referral_1 = __importDefault(require("../../model/referral"));
class Controller {
    async login(req, res, next) {
        try {
            (0, helpers_1.validateRequest)(req);
            const { email, password } = req.body;
            let user = await user_1.default.findOne({ email });
            if (!user)
                throw new service_error_1.NotFoundException("User not found");
            if (password !== user.password)
                throw new service_error_1.BadRequestException(`Incorrect password`);
            const data = {
                access_token: jwt_1.default.create({ id: user === null || user === void 0 ? void 0 : user.id, role: user.role }),
                user: {
                    ...user.toJSON(),
                    password: null
                }
            };
            res.cookie("jwt", data.access_token, { httpOnly: true, maxAge: 3 * 24 * 60 * 60 * 1000 });
            return (0, helpers_1.responsHandler)(res, "User login successful", http_status_codes_1.StatusCodes.OK, data);
        }
        catch (error) {
            console.log(error);
            next(error);
        }
    }
    async register(req, res, next) {
        var _a;
        try {
            (0, helpers_1.validateRequest)(req);
            const { email, password, phone_number, first_name, last_name } = req.body;
            let user = await user_1.default.findOne({ email });
            if (user)
                throw new service_error_1.BadRequestException("User with same email/username already exist");
            let referral = null;
            if ("referral_code" in req.body) {
                referral = await user_1.default.findOne({ referral_code: (_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.referral_code });
                if (!referral)
                    throw new service_error_1.NotFoundException("Invalid referral code");
            }
            user = new user_1.default({
                email,
                phone_number,
                password, first_name, last_name,
                // address: faker.finance.ethereumAddress(),
                // avatar: avatars[Math.floor(Math.random() * avatars.length - 1)],
            });
            await user.save();
            if (referral) {
                await referral_1.default.create({
                    user: referral.id,
                    referee: user.id,
                    reward: 10
                });
            }
            // await mail.send({
            //   to: email,
            //   from: "noreply@artversehub.com", 
            //   subject: "🎉 Welcome to Artverse! 🎉",
            //   html: `
            //   Hello ${username}, <br /> <br />
            //   Thank you for joining our vibrant community of NFT enthusiasts! We’re thrilled to have you on board. <br /><br />
            //   At Artverse, you can explore a world of unique and captivating NFTs. Whether you're here to discover, collect, or invest in digital art, we have something for everyone. <br /><br />
            //   To get started, check out the latest collections, connect with other collectors, and immerse yourself in the art and creativity that makes our platform special. <br /><br />
            //   If you have any questions or need assistance, our support team is here to help. Enjoy your journey through the Artverse!
            //   you have a new registration.<br /> <br />
            //   Happy exploring,<br />
            //   The Artverse Team<br />
            //   `
            // })
            return (0, helpers_1.responsHandler)(res, "Registration successful", http_status_codes_1.StatusCodes.CREATED);
        }
        catch (error) {
            next(error);
        }
    }
    async sendOTP(req, res, next) {
        try {
            (0, helpers_1.validateRequest)(req);
            const { email } = req.body;
            await mail_1.default.sendOTP(email);
            return (0, helpers_1.responsHandler)(res, "Registration successful", http_status_codes_1.StatusCodes.OK);
        }
        catch (error) {
            next(error);
        }
    }
    async verifyOTP(req, res, next) {
        try {
            (0, helpers_1.validateRequest)(req);
            const { email } = req.body;
            await mail_1.default.sendOTP(email);
            return (0, helpers_1.responsHandler)(res, "Registration successful", http_status_codes_1.StatusCodes.OK);
        }
        catch (error) {
            next(error);
        }
    }
    async logout(req, res, next) {
        res.cookie('jwt', '', { maxAge: 1 });
        res.redirect('/');
    }
}
exports.default = new Controller();
//# sourceMappingURL=controller.js.map