import Investment from "../../model/investment";
import { Response, NextFunction } from "express";
import Plan from "../../model/plans";
import User from "../../model/user";
import { BadRequestException, NotFoundException } from "../../utility/service-error";
import { ICreateInvestment } from "./interface";
import { responsHandler, validateRequest } from "../../utility/helpers";
import { StatusCodes } from "http-status-codes";
import numeral from "numeral";
import Transaction from "../../model/transaction";


class Controller {
  async create(req: any, res: Response, next: NextFunction){
    try {
      validateRequest(req)
      const { plan_id, amount } = req.body

      const plan = await Plan.findById(plan_id)
      if(!plan) throw new NotFoundException("Plan not found");
      if(amount < plan.min_price || ( plan.max_price !== null && amount > plan.max_price)){
        throw new BadRequestException(`Amount should be within the range of $${plan.min_price} - $${plan.max_price}`)
      }

      const user = await User.findById(req.user)
      if(amount > user.balance){
        throw new BadRequestException("Insufficient funds")
      }

      await Investment.create({
        plan_name: plan?.name,
        plan_id: plan?.id,
        capital: amount,
        user: req?.user,
        status: "pending"
      })

      user.balance = numeral(user?.balance).subtract(amount).value()
      await user.save()
      await Transaction.create({
        user: req?.user,
        amount, currency: "USD",
        status: "approved",
        type: ""
      })

      return responsHandler(res, "Investment created successfully", StatusCodes.CREATED)
    } catch (error) {
      next(error)
    }
    
  }

  async investments(req: any, res: Response, next: NextFunction){
    try {
      const data = await Investment.paginate(
        { user: req.user },
        { sort: { created_at: "desc" } }
      )

      return responsHandler(res, "Investment retrieved successfully", StatusCodes.OK, data)
    }
    catch (error) {
      next(error)
    }

  }

  async withdraw(){

  }
}
export default new Controller()