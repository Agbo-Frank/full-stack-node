import { Router } from "express";
import cltr from "./controller"
import valid, { emailValidator } from "./validator"

const router = Router()

router.post("/login", valid.login, cltr.login)
router.post("/register", valid.register, cltr.register)
router.post("/send-otp", emailValidator, cltr.sendOTP)
router.post("/reset-password", valid.resetPassword, cltr.resetPassword)
router.delete("/logout", cltr.logout)

export default router