import { Router } from "express";
import ctrl from "./controller"
import valid from "./validator"

const router = Router()

router.post("/", valid.create, ctrl.create)
router.post("/withdraw", valid.withdraw, ctrl.withdraw)

export default router