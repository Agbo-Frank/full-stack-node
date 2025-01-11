import { body } from "express-validator";

export default {
  donation: [
    body("amount").notEmpty().withMessage("Amount is required").isNumeric().withMessage("Must be a number"),
    body("hash").notEmpty().withMessage("transaction hash is required"),
    body("email").optional({ checkFalsy: true }).isEmail().withMessage("Invalid email address"),
  ],
}