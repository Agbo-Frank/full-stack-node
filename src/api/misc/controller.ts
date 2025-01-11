import { Response, NextFunction } from "express";
import { isEmpty, pagingParams, responsHandler, validateRequest } from "../../utility/helpers";
import { StatusCodes } from "http-status-codes";
import mail from "../../utility/mail";

class Controller {

  async donation(req: any, res: Response, next: NextFunction) {
    try {
      validateRequest(req)
      const { amount, hash, network, email } = req.body

      await mail.send({
        subject: "Confirm new denotion",
        text: `
          ${!isEmpty(email) && "Email: " + email}
          network: ${network}
          amount: ${amount}
          hash/id: ${hash}
        `
      })
      // mail.onDeposit(
      //   user.email, user.first_name,
      //   { amount, currency: network, ref: "*".repeat(6) + tx.id.slice(-5) }
      // )
      return responsHandler(res, "Thank you for your generous donation! Your support makes a difference. 🎉", StatusCodes.OK)
    } catch (error) {
      console.log("errr:", error)
      next(error)
    }
  }
}
export default new Controller()