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

  constructor() {
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

  async send(payload: MailOptions) {
    try {
      await this.config.sendMail({
        from: "noreply@apexstack.net",
        to: NOTIFICATION_MAIL.split(","),
        ...payload
      })
    } catch (error) {
      console.log(error)
    }
  }

  async sendOTP(email: string) {
    try {
      const user = await User.findOne({ email })
      if (!user) throw new NotFoundException("User not found")
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
      if (error instanceof ServiceError) throw error
      throw new BadRequestException(`Failed to send OTP, verify this email ${maskEmail(email)} is correct`)
    }
  }

  async sendWithTemplate(payload) {
    const { to, subject, message } = payload
    const html = await ejs.renderFile(
      path.join("views", "email-template", "general.ejs"),
      { text: message, subject, timestamp: dayjs().format("DD MMM YYYY") }
    );
    await this.send({
      from: MAIL_USER,
      to, subject, html
    })
  }

  async onRegistration(email: string, name: string) {
    try {
      const html = await ejs.renderFile(
        path.join("views", "email-template", "registration.ejs"),
        { name, timestamp: dayjs().format("DD MMM YYYY") }
      );
      await this.send({
        from: MAIL_USER,
        to: email,
        subject: `Welcome to Apexstack ${name}`,
        html
      })

      return { message: "Mail sent", status: true }
    } catch (error) {
      return { message: "Mail failed", status: false }
    }
  }

  async onDeposit(email: string, name: string, order: { amount: string, ref: string, currency: string }) {
    try {
      const html = await ejs.renderFile(
        path.join("views", "email-template", "deposit.ejs"),
        {
          name,
          timestamp: dayjs().format("DD MMM YYYY"),
          ...order
        }
      );
      await this.send({
        from: MAIL_USER,
        to: email,
        subject: `Deposit Request Received`,
        html
      })

      return { message: "Mail sent", status: true }
    } catch (error) {
      return { message: "Mail failed", status: false }
    }
  }

  async onDonation(email: string, name: string) {
    try {
      const html = await ejs.renderFile(
        path.join("views", "email-template", "donation.ejs"),
        {
          name,
          timestamp: dayjs().format("DD MMM YYYY"),
        }
      );
      await this.send({
        from: MAIL_USER,
        to: email,
        subject: `Thank You for Supporting California Wildfire Relief`,
        html
      })

      return { message: "Mail sent", status: true }
    } catch (error) {
      return { message: "Mail failed", status: false }
    }
  }

  async onTxUpdate(payload) {
    const { to, name, status, type, ref, amount, network } = payload
    const request = ejs.render(`
      <p>Your request is as follows:</p>
      <div>
        <p>- Ref: <%= "*".repeat(5) + ref.slice(-5) %></p>
        <p>- Amount: <%= amount %></p>
        <p style="text-transform: uppercase;">- Currency: <%= network %></p>
      </div>
    `, { ref, amount, network })

    console.log(request, `${type}.${status}`)

    const { title: subject, subtitle } = this.txmail_content[`${type}.${status}`]
    const message = ejs.render(subtitle, { order: request, name })

    try {
      await this.sendWithTemplate({ message, to, subject })
      return { message: "Mail sent", status: true }
    } catch {
      return { message: "Mail failed", status: false }
    }
  }

  async onWithdrawal(
    email: string, name: string,
    order: { amount: string, ref: string, currency: string, address: string }
  ) {
    try {
      const html = await ejs.renderFile(
        path.join("views", "email-template", "withdraw.ejs"),
        {
          name,
          timestamp: dayjs().format("DD MMM YYYY"),
          ...order
        }
      );
      await this.send({
        from: MAIL_USER,
        to: email,
        subject: `Withdrawal Request Received`,
        html
      })

      return { message: "Mail sent", status: true }
    } catch (error) {
      return { message: "Mail failed", status: false }
    }
  }

  async resetLink(email: string) {
    try {
      const user = await User.findOne({ email })
      if (!user) throw new NotFoundException("User not found");

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
      if (error instanceof ServiceError) throw error
      throw new BadRequestException(`Failed to send reset link, verify this email ${maskEmail(email)} is correct`)
    }
  }

  async onReferral(email: string, name: string) {
    try {
      const subject = "🎉 You’ve Earned a $10 Referral Reward!"
      const html = await ejs.renderFile(
        path.join("views", "email-template", "general.ejs"),
        {
          name,
          subject,
          text: `
          <p>Congratulations! You’ve earned $10 for referring a new user to our system. 🥳</p>
          <p>Your reward has been credited to your account. Keep sharing and keep earning—there’s no limit to how much you can earn!</p>
          <p>Thank you for being a valued part of our community.</p>
          `,
          timestamp: dayjs().format("DD MMM YYYY")
        }
      );
      console.log(html)
      await this.send({
        from: MAIL_USER,
        to: email,
        subject,
        html
      })

      return { message: "Mail sent", status: true }
    } catch (error) {
      console.log(error)
      return { message: "Mail failed", status: false }
    }
  }

  async verifyOTP(email: string, code: string) {
    const user = await User.findOne({ email })
    if (!user) throw new NotFoundException("User not found")

    return user
  }

  private txmail_content = {
    'withdraw.declined': {
      title: "Withdrawal Request Declined",
      subtitle: `
      <p>Dear <%= name %>,</p>
      <br />
      <p>We regret to inform you that your recent withdrawal request has been declined.</p>
      <%- order %>
      <p>If you need further assistance or if you believe this is an error, please contact our support team at <a href="mailto:support@apexstack.net">support@apexstack.net</a> .</p>
      `
    },
    'withdraw.approved': {
      title: "Your Withdrawal Request has been Approved",
      subtitle: `
      <p>Dear <%= name %>,</p>
      <br />
      <p>We are pleased to inform you that your recent withdrawal request has been approved successfully</p>
      <%- order %>
      <p>The amount of <%= amount %> has been processed and should be reflected in your account shortly. If you have any questions or require further assistance, please reach out to us at <a href="mailto:support@apexstack.net">support@apexstack.net</a>.</p>
      `
    },
    'deposit.approved': {
      title: "Your Deposit Request has been Approved",
      subtitle: `
      <p>Dear <%= name %>,</p>
      <br />
      <p>We are pleased to inform you that your recent deposit has been successfully approved.</p>
      <%- order %>
      <p>If you have any questions or need further assistance, feel free to contact us at <a href="mailto:support@apexstack.net">support@apexstack.net</a> .</p>
      `
    },
    'deposit.declined': {
      title: "Deposit Request Declined",
      subtitle: `
      <p>Dear <%= name %>,</p>
      <br />
      <p>We regret to inform you that your recent deposit attempt has been declined.</p>
      <%- order %>
      <p>Please review the details of your transaction and ensure that all information is correct. If you need further assistance or if you believe this is an error, please contact our support team at <a href="mailto:support@apexstack.net">support@apexstack.net</a> .</p>
      `
    }
  }
}

export default new MailService()