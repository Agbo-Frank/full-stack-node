import nodemailer from "nodemailer"
import { MAIL_HOST, MAIL_PASS, MAIL_PORT, MAIL_USER } from "../utility/config";
import { BadRequestException, NotFoundException, ServiceError } from "../utility/service-error";
import { MailOptions } from "nodemailer/lib/sendmail-transport";
import { maskEmail, randNum } from "../utility/helpers";
import dayjs from "dayjs";
import User from "../model/user";

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
      await this.config.sendMail({ from: "noreply@artversehub.com", ...payload })
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

  async verifyOTP(email: string, code: string){
    const user = await User.findOne({ email })
    if(!user) throw new NotFoundException("User not found")

    return user
  }
}

export default new MailService()