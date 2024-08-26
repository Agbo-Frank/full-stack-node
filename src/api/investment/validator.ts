import { body } from "express-validator";

export default {
  create: [
    body("plan_id").notEmpty().withMessage("select plan").isMongoId().withMessage("Invalid plan id"),
    body("amount").notEmpty().withMessage("Amount is required").isInt().withMessage("Amount must be numeric")
  ],
  withdraw: body("id").notEmpty().withMessage("select investment").isMongoId().withMessage("Invalid plan id")
}