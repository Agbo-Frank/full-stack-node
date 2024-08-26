import { Router } from "express"
import cltr from "./controller"
import valid from "./validator"

const router = Router()

router.put("/profile", cltr.update)
router.post("/avatar", cltr.uploadAvatar)
router.post("/change-password", valid.changePassword, cltr.changePassword)
router.post("/withdraw", valid.withdraw, cltr.withdraw)
router.post("/referral/withdraw", cltr.referalWithdrawl)
router.post("/deposit", valid.deposit, cltr.deposit)

export default router