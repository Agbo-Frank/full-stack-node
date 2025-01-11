import { Router } from "express"
import cltr from "./controller"
import valid from "./validator"

const router = Router()

router.post("/donation", valid.donation, cltr.donation)

export default router