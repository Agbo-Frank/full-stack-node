import { Router } from "express";
import ctrl from "./controller";

const router = Router()

router.get("/users", ctrl.users)
router.get("/investments", ctrl.investments)
router.get("/transactions", ctrl.transactions)

export default router