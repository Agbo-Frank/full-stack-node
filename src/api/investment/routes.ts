import { Router } from "express";
import ctrl from "./controller"
import valid from "./validator"
import guard from "../../middleware/guard";

const router = Router()

router.post("/", guard, valid.create, ctrl.create)

export default router