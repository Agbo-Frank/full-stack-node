"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../../utility/helpers");
const http_status_codes_1 = require("http-status-codes");
const mail_1 = __importDefault(require("../../utility/mail"));
class Controller {
    async donation(req, res, next) {
        try {
            (0, helpers_1.validateRequest)(req);
            const { amount, hash, network, email, name } = req.body;
            await mail_1.default.send({
                subject: "Confirm new denotion",
                text: `
          Email: ${email || "Nill"}
          Name: ${name || "Nill"}
          network: ${network}
          amount: ${amount}
          hash/id: ${hash}
        `
            });
            if (!(0, helpers_1.isEmpty)(email) && !(0, helpers_1.isEmpty)(name)) {
                mail_1.default.onDonation(email, name);
            }
            return (0, helpers_1.responsHandler)(res, "Thank you for your generous donation! Your support makes a difference. 🎉", http_status_codes_1.StatusCodes.OK);
        }
        catch (error) {
            console.log("errr:", error);
            next(error);
        }
    }
}
exports.default = new Controller();
//# sourceMappingURL=controller.js.map