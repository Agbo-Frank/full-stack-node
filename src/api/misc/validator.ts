import { body } from "express-validator";

export default {
  donation: [
    body("amount").notEmpty().withMessage("Amount is required").isNumeric().withMessage("Must be a number"),
    body("hash").notEmpty().withMessage("transaction hash is required"),
    body("email").optional().isEmail().withMessage("Invalid email address"),
    body("name").if(body("email").exists()).notEmpty().withMessage("Enter your full name")
  ],
}