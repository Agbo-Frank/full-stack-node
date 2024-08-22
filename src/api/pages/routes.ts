import { Router } from "express";
import cltr from "./controller"

const router = Router()

router.get("/", cltr.home)
router.get("/login", cltr.login)
router.get("/register", cltr.register)
router.get("/policy", cltr.policy)
router.get("/dashboard", cltr.dashboard)
router.get("/transactions", cltr.transactions)
router.get("/plans", cltr.plans)
router.get("/investments", cltr.investments)
router.get("/settings", cltr.settings)
router.get("/deposit", cltr.deposit)
router.get("/withdraw", cltr.withdraw)
router.get("/contact", cltr.contact)
router.get("/referrals", cltr.referrals)
router.get("/kyc", cltr.kyc)
router.get("/*", cltr.error)

export default router