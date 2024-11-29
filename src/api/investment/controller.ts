import Investment, { investment_status } from "../../model/investment";
import { Response, NextFunction } from "express";
import Plan from "../../model/plans";
import User from "../../model/user";
import { BadRequestException, NotFoundException } from "../../utility/service-error";
import { ICreateInvestment } from "./interface";
import { responsHandler, validateRequest } from "../../utility/helpers";
import { StatusCodes } from "http-status-codes";
import numeral from "numeral";
import Transaction from "../../model/transaction";
import Referral from "../../model/referral";
import dayjs from "dayjs";


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
        plan: plan?.id,
        capital: amount,
        user: req?.user,
        status: investment_status.active
      })

      user.total_deposit = numeral(user?.total_deposit).subtract(amount).value()
      user.balance = numeral(user?.balance).add(amount).value()

      await user.save()
      await Transaction.create({
        user: req?.user,
        amount, currency: "USD",
        status: "approved",
        description: `Investment initialization: ${plan?.name}`,
        type: "charge"
      })

      const referral = await Referral.findOne({ referee: user.id })
      if(referral && referral.completed){
        referral.updateOne({ completed: true })
      }

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

  async withdraw(req: any, res: Response, next: NextFunction){
    try {
      const inv = await Investment.findById(req.body.id)
      if(!inv) throw new NotFoundException("Investment not found");
      if(inv.status !== investment_status.active){
        throw new NotFoundException("Investment is " + inv.status);
      }
      if(dayjs().diff(inv.created_at, "days") < 10) {
        throw new BadRequestException("Withdrawal allowed only after 10 days of investment.");
      };

      const user = await User.findById(req.user)
      if(!user) throw new NotFoundException("User not found");
      const amount = numeral(inv.capital).add(inv.profit).value()

      user.total_deposit = numeral(amount).add(user.total_deposit).value()
      user.balance = numeral(user.balance).subtract(amount).value()
      user.earnings = numeral(user.earnings).subtract(inv.profit).value()

      inv.status = investment_status.completed;

      await inv.save()
      await user.save()

      await Transaction.create({
        user: req.user,
        type: "commission",
        currency: "USD",
        amount,
        status: "approved",
        description: "Investment withdrawal"
      })

      return responsHandler(res, "Investment retrieved successfully", StatusCodes.OK)
    }
    catch (error) {
      next(error)
    }

  }
}
export default new Controller()