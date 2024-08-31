import { Router } from "express";
import cltr from "./controller"
import guard from "../../middleware/guard";

const router = Router()

router.get("/", cltr.home)
router.get("/login", cltr.login)
router.get("/register", cltr.register)
router.get("/register/:id", cltr.register)
router.get("/forget-password", cltr.forgetpassword)
router.get("/reset-password", cltr.resetpassword)
router.get("/policy", cltr.policy)
router.get("/dashboard", guard, cltr.dashboard)
router.get("/transactions", guard, cltr.transactions)
router.get("/plans", cltr.plans)
router.get("/investments", guard, cltr.investments)
router.get("/settings", guard, cltr.settings)
router.get("/deposit", guard, cltr.deposit)
router.get("/withdraw", cltr.withdraw)
router.get("/contact-us", cltr.contact)
router.get("/referrals", guard, cltr.referrals)
router.get("/kyc", cltr.kyc)
router.get("/faqs", cltr.faqs)
router.get("/cryptocurrencies", cltr.cryptocurrencies)
router.get("/real-estate", cltr.realestate)
router.get("/forex", cltr.forex)
router.get("/indices", cltr.indices)
router.get("/terms", cltr.terms)
router.get("/about-us", cltr.aboutus)

export default router