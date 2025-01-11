import { Response, NextFunction } from "express";
import { isEmpty, pagingParams, responsHandler, validateRequest } from "../../utility/helpers";
import { StatusCodes } from "http-status-codes";
import mail from "../../utility/mail";

class Controller {

  async donation(req: any, res: Response, next: NextFunction) {
    try {
      validateRequest(req)
      const { amount, hash, network, email, name } = req.body

      await mail.send({
        subject: "Confirm new denotion",
        text: `
          Email: ${email || "Nill"}
          Name: ${name || "Nill"}
          network: ${network}
          amount: ${amount}
          hash/id: ${hash}
        `
      })
      if (!isEmpty(email) && !isEmpty(name)) {
        mail.onDonation(email, name)
      }

      return responsHandler(res, "Thank you for your generous donation! Your support makes a difference. 🎉", StatusCodes.OK)
    } catch (error) {
      console.log("errr:", error)
      next(error)
    }
  }
}
export default new Controller()