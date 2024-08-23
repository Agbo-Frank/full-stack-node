import { Router } from "express";
import ctrl from "./controller";
import valid from "./validator"

const router = Router()

// router.get("/users", ctrl.users)
// router.get("/investments", ctrl.investments)
router.post("/plan", valid.createPlan, ctrl.createPlan)

export default router