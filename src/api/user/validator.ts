import { body } from "express-validator";

export default {
  changePassword: [
    body("new_password").notEmpty().withMessage("New password is required"),
    body("old_password").notEmpty().withMessage("Old password is required")
  ],
  deposit: [
    body("amount").notEmpty().withMessage("Amount is required").isNumeric().withMessage("Must be a number"),
    body("hash").notEmpty().withMessage("transaction hash is required")
  ],
  withdraw: [
    body("amount").notEmpty().withMessage("Amount is required").isNumeric().withMessage("Must be a number").isInt({ min: 30 }).withMessage("Minimum withdrawal amount is $30"),
    body("address").notEmpty().withMessage("Address is required").isEthereumAddress().withMessage("Invalid address")
  ],
  contact: [
    body("name").notEmpty().withMessage("Full name is required"),
    body("message").notEmpty().withMessage("Full name is required"),
    body("email").notEmpty().withMessage("Email is required").isEmail().withMessage("Invalid email address")
  ]
}