import { body } from "express-validator";

export const emailValidator = body("email").notEmpty().withMessage("Email is required").isEmail().withMessage("Invalid email addresss").toLowerCase()
export const passwordValidator = body("password").notEmpty().withMessage("Password is required")

export default {
  login: [ emailValidator, passwordValidator ],
  register: [
    emailValidator, passwordValidator,
    body("first_name").notEmpty().withMessage("First name is required"),
    body("last_name").notEmpty().withMessage("Last name is required"),
    body("phone_number").notEmpty().withMessage("Phone number is required"),
  ]
}