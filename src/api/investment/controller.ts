import Investment from "../../model/investment";
import { Response, NextFunction } from "express";
import Plan from "../../model/plans";
import User from "../../model/user";
import { BadRequestException, NotFoundException } from "../../utility/service-error";
import { ICreateInvestment } from "./interface";
import { responsHandler, validateRequest } from "../../utility/helpers";
import { StatusCodes } from "http-status-codes";


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

      return responsHandler(res, "investment created successfully", StatusCodes.CREATED)
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