import { Router } from "express";
import cltr from "./controller"
import guard from "../../middleware/guard";
import { wrapAsync } from "../../utility/helpers";
import checkUser from "../../middleware/check-user";

const router = Router()

router.get("/", cltr.home)
router.get("/login", cltr.login)
router.get("/register", cltr.register)
router.get("/register/:id", cltr.register)
router.get("/policy", cltr.policy)
router.get("/dashboard", guard, cltr.dashboard)
router.get("/transactions", guard, cltr.transactions)
router.get("/plans", cltr.plans)
router.get("/investments", cltr.investments)
router.get("/settings", guard, cltr.settings)
router.get("/deposit", guard, cltr.deposit)
router.get("/withdraw", cltr.withdraw)
router.get("/contact", cltr.contact)
router.get("/referrals", guard, cltr.referrals)
router.get("/kyc", cltr.kyc)
// router.get("/*", cltr.error)

export default router