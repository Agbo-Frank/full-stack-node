import { Response, NextFunction } from "express";
import { generateCode, maskEmail, responsHandler, validateRequest } from "../../utility/helpers";
import User from "../../model/user";
import { BadRequestException, NotFoundException } from "../../utility/service-error";
import jwt from "../../utility/jwt";
import { StatusCodes } from "http-status-codes";
import mail from "../../utility/mail";
import Referral from "../../model/referral";
import dayjs from "dayjs";

class Controller {
  async login(req: any, res: Response, next: NextFunction){
    try {
      validateRequest(req)

      const { email, password } = req.body
      let user = await User.findOne({ email })
      if(!user) throw new NotFoundException("User not found");

      if(password !== user.password) throw new BadRequestException(`Incorrect password`);

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

  async register(req: any, res: Response, next: NextFunction){
    try {
      validateRequest(req)

      const { email, password, phone_number, first_name, last_name } = req.body
      let user = await User.findOne({ email })
      if(user)throw new BadRequestException("User with same email/username already exist");

      let referral = null
      if("referral_code" in req.body){
        referral = await User.findOne({ referral_code: req?.body?.referral_code })
        if(!referral) throw new NotFoundException("Invalid referral code");
      }
      const referral_code = await generateCode(email)
  
      user = new User({ 
        email, 
        phone_number, 
        password, first_name, 
        last_name, referral_code,
      })

      await user.save()

      if(referral){
        await Referral.create({
          user: referral.id,
          referee: user.id,
          reward: 10
        })
      }
      
      // await mail.send({
      //   to: email,
      //   from: "noreply@artversehub.com", 
      //   subject: "🎉 Welcome to Artverse! 🎉",
      //   html: `
      //   Hello ${username}, <br /> <br />

      //   Thank you for joining our vibrant community of NFT enthusiasts! We’re thrilled to have you on board. <br /><br />

      //   At Artverse, you can explore a world of unique and captivating NFTs. Whether you're here to discover, collect, or invest in digital art, we have something for everyone. <br /><br />

      //   To get started, check out the latest collections, connect with other collectors, and immerse yourself in the art and creativity that makes our platform special. <br /><br />

      //   If you have any questions or need assistance, our support team is here to help. Enjoy your journey through the Artverse!
      //   you have a new registration.<br /> <br />
        
      //   Happy exploring,<br />
      //   The Artverse Team<br />
      //   `
      // })
      return responsHandler(res, "Registration successful", StatusCodes.CREATED)
    } catch (error) {
      console.log(error)
      next(error)
    }
  }

  async sendOTP(req: any, res: Response, next: NextFunction){
    try {
      validateRequest(req)
      const { email } = req.body

      await mail.resetLink(email)
      return responsHandler(res, "OTP sent to yout mail " + maskEmail(email) , StatusCodes.OK)
    }
    catch (error) {
      next(error)
    }
  }

  async resetPassword(req: any, res: Response, next: NextFunction){
    try {
      validateRequest(req)
      const { password, token } = req.body

      const decoded = jwt.verify(token);
      if(!decoded) return res.redirect('/login');

      await User.updateOne({ _id: decoded?.id }, { password })

      return responsHandler(res, "Password reset successfully", StatusCodes.OK)
    }
    catch (error) {
      next(error)
    }
  }

  async logout(req: any, res: Response, next: NextFunction){
    res.cookie('jwt', '', { maxAge: 1 });
    return responsHandler(res, "Logout successful", StatusCodes.OK)
  }
}
export default new Controller()