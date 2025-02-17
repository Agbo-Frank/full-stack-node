import { Response, NextFunction } from "express";
import { generateCode, isEmpty, maskEmail, responsHandler, validateRequest } from "../../utility/helpers";
import User from "../../model/user";
import { BadRequestException, NotFoundException } from "../../utility/service-error";
import jwt from "../../utility/jwt";
import { StatusCodes } from "http-status-codes";
import mail from "../../utility/mail";
import Referral from "../../model/referral";

class Controller {
  async login(req: any, res: Response, next: NextFunction) {
    try {
      validateRequest(req)

      const { email, password } = req.body
      let user = await User.findOne({ email })
      if (!user) throw new NotFoundException("User not found");

      if (password !== user.password) throw new BadRequestException(`Incorrect password`);

      const data = {
        access_token: jwt.create({ id: user?.id, role: user.role }),
        user: {
          ...user.toJSON(),
          password: null
        }
      }

      res.cookie("jwt", data.access_token, { httpOnly: true, maxAge: 3 * 24 * 60 * 60 * 1000 })
      return responsHandler(res, "User login successful", StatusCodes.OK, data)

    } catch (error) {
      console.log(error)
      next(error)
    }
  }

  async register(req: any, res: Response, next: NextFunction) {
    try {
      validateRequest(req)

      const { email, password, phone_number, first_name, last_name } = req.body
      let user = await User.findOne({ email })
      if (user) throw new BadRequestException("User with same email/username already exist");

      let referral = null
      if ("referral_code" in req.body && !isEmpty(req.body?.referral_code)) {
        referral = await User.findOne({ referral_code: req.body?.referral_code })
        if (!referral) throw new NotFoundException("Invalid referral code");
      }
      const referral_code = await generateCode(email)

      user = new User({
        email,
        phone_number,
        password, first_name,
        last_name, referral_code,
      })

      await user.save()

      if (referral) {
        await Referral.create({
          user: referral.id,
          referee: user.id,
          reward: 10,
          paid: false
        })
      }
      mail.onRegistration(email, first_name)
      return responsHandler(res, "Registration successful", StatusCodes.CREATED)
    } catch (error) {
      console.log(error)
      next(error)
    }
  }

  async sendOTP(req: any, res: Response, next: NextFunction) {
    try {
      validateRequest(req)
      const { email } = req.body

      await mail.resetLink(email)
      return responsHandler(res, "OTP sent to yout mail " + maskEmail(email), StatusCodes.OK)
    }
    catch (error) {
      next(error)
    }
  }

  async resetPassword(req: any, res: Response, next: NextFunction) {
    try {
      validateRequest(req)
      const { password, token } = req.body

      const decoded = jwt.verify(token);
      if (!decoded) return res.redirect('/login');

      await User.updateOne({ _id: decoded?.id }, { password })

      return responsHandler(res, "Password reset successfully", StatusCodes.OK)
    }
    catch (error) {
      next(error)
    }
  }

  async logout(req: any, res: Response, next: NextFunction) {
    res.cookie('jwt', '', { maxAge: 1 });
    return responsHandler(res, "Logout successful", StatusCodes.OK)
  }
}
export default new Controller()