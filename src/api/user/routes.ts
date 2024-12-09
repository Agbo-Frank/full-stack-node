import { Router } from "express"
import cltr from "./controller"
import valid from "./validator"
import guard from "../../middleware/guard"

const router = Router()

router.put("/profile", guard, cltr.update)
router.post("/avatar", guard, cltr.uploadAvatar)
router.post("/change-password", guard, valid.changePassword, cltr.changePassword)
router.post("/withdraw", guard, valid.withdraw, cltr.withdraw)
router.post("/referral/withdraw", guard, cltr.referalWithdrawl)
router.post("/deposit", guard, valid.deposit, cltr.deposit)
router.post("/contact", valid.contact, cltr.contact)
router.post("/kyc", guard, cltr.kyc)

export default router