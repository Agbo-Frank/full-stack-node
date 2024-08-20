import { Router } from "express";
import cltr from "./controller"
import valid from "./validator"
import guard, { guardValid } from "../../middleware/guard";

const router = Router()

router.get("/profile", guardValid, guard, cltr.profile)
router.put("/profile", guardValid, guard, cltr.update)
router.post("/change-password", guardValid, guard, valid.changePassword, cltr.changePassword)
router.post("/withdraw", guardValid, guard, valid.withdraw, cltr.withdraw)
router.post("/deposit", guardValid, guard, valid.deposit, cltr.deposit)
router.get("/transactions", guardValid, guard,  cltr.transactions)

export default router