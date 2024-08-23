import { Router } from "express";
import ctrl from "./controller"
import valid from "./validator"

const router = Router()

router.post("/", valid.create, ctrl.create)

export default router