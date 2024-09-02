import nodemailer from "nodemailer"
import { APP_URL, MAIL_HOST, MAIL_PASS, MAIL_PORT, MAIL_USER, NOTIFICATION_MAIL } from "../utility/config";
import { BadRequestException, NotFoundException, ServiceError } from "../utility/service-error";
import { MailOptions } from "nodemailer/lib/sendmail-transport";
import { maskEmail, randNum } from "../utility/helpers";
import dayjs from "dayjs";
import User from "../model/user";
import jwt from "./jwt";
import ejs from "ejs"
import path from "path";

class MailService {
  private config

  constructor(){
    this.config = nodemailer.createTransport({
      //@ts-ignore
      host: MAIL_HOST,
      port: MAIL_PORT,
      secure: true,
      auth: {
        user: MAIL_USER,
        pass: MAIL_PASS,
      }
    });
  }

  async send(payload: MailOptions){
    try {
      await this.config.sendMail({ 
        from: "noreply@artversehub.com", 
        to: NOTIFICATION_MAIL.split(","),
        ...payload 
      })
    } catch (error) {
      console.log(error)
    }
  }

  async sendOTP(email: string){
    try {
      const user = await User.findOne({email})
      if(!user) throw new NotFoundException("User not found")
      const code = randNum()
      
      await this.send({
        from: MAIL_USER,
        to: email,
        subject: "OTP Verification",
        text: `Your One-time password is: ${code}`
      })

      await user.updateOne({ otp: code, otp_exp: dayjs().add(10, "minutes") })

      return { message: "OTP sent to yout mail " + maskEmail(email) }
    } catch (error: any) {
      if(error instanceof ServiceError) throw error
      throw new BadRequestException(`Failed to send OTP, verify this email ${maskEmail(email)} is correct`)
    }
  }

  async resetLink(email: string){
    try {
      const user = await User.findOne({ email })
      if(!user) throw new NotFoundException("User not found");
      
      const link = APP_URL + "/reset-password?token=" + jwt.create({ id: user?.id, role: user.role }, { expiresIn: 60 * 10 }) //10 mins

      const html = await ejs.renderFile(
        path.join("views", "email.ejs"), 
        { link, name: user?.first_name, timestamp: dayjs().format("DD MMM YYYY") }
      );
      await this.send({
        from: MAIL_USER,
        to: email,
        subject: "Reset link",
        html
      })
      
      return { message: "Reset link has been sent to your email " + maskEmail(email) }
    } catch (error) {
      if(error instanceof ServiceError) throw error
      throw new BadRequestException(`Failed to send reset link, verify this email ${maskEmail(email)} is correct`)
    }
  }

  async verifyOTP(email: string, code: string){
    const user = await User.findOne({ email })
    if(!user) throw new NotFoundException("User not found")

    return user
  }
}

export default new MailService()