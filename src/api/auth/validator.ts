import { body } from "express-validator";

export const emailValidator = body("email").notEmpty().withMessage("Email is required").isEmail().withMessage("Invalid email addresss").toLowerCase()
export const passwordValidator = body("password").notEmpty().withMessage("Password is required")

export default {
  login: [ emailValidator, passwordValidator ],
  register: [
    emailValidator, passwordValidator,
    body("username").notEmpty().withMessage("Username is required").matches(/^\S*$/).withMessage('Username should not contain spaces'),
  ]
}