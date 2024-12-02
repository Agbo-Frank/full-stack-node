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
exports.default = initiateJobs;
const dayjs_1 = __importDefault(require("dayjs"));
const investment_1 = __importStar(require("../model/investment"));
const plans_1 = __importDefault(require("../model/plans"));
const numeral_1 = __importDefault(require("numeral"));
const node_cron_1 = __importDefault(require("node-cron"));
const user_1 = __importDefault(require("../model/user"));
async function updateUsersInvestments() {
    console.log("Updating investment initialized...");
    const investments = await investment_1.default.find({ status: investment_1.investment_status.active });
    if (investments.length === 0)
        return;
    const plans = await plans_1.default.find();
    investments.forEach(async (inv) => {
        if ((0, dayjs_1.default)().diff(inv.created_at, "hours") < 24)
            return;
        const plan = plans.find(p => p.id === inv.plan);
        const profit = (0, numeral_1.default)(inv.capital).multiply(plan.rate).multiply(0.01).value();
        await inv.updateOne({ $inc: { profit } });
        await user_1.default.updateOne({ _id: inv.user }, {
            $inc: {
                earnings: profit,
                balance: profit
            }
        });
    });
    console.log("Updating investment completed...");
}
async function initiateJobs() {
    try {
        node_cron_1.default.schedule("0 0 * * *", //0 0 * * *
        updateUsersInvestments, { timezone: "UTC" });
        console.log("cron job set up successfully");
    }
    catch (error) {
        console.log("cron job set up failed");
    }
}
// mongoose.connect(MONGODB_URL as string, {autoIndex: false})
//   .then(async () => {
//     console.log("MongoDB connected successfully...");
//     await updateUsersInvestments()
//   })
//   .catch((err) => console.log("MongoDB Error just occured " + err))
//# sourceMappingURL=index.js.map