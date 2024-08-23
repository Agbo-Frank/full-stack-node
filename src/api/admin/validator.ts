import { body } from "express-validator";

export default {
  createPlan: [
    body("name").notEmpty().withMessage("Plan name is required"),
    body("rate").notEmpty().withMessage("Rate is required").isNumeric().withMessage("Must be a number"),
    body("min_price").notEmpty().withMessage("Mininum price is required").isNumeric().withMessage("Mininum price must be a number"),
    body("max_price").notEmpty().withMessage("Maximum price is required").isNumeric().withMessage("Maximum price must be a number"),
  ]
}