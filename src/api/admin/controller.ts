import { Response, NextFunction } from "express";
import { extractFilters, pagingParams, responsHandler, validateRequest } from "../../utility/helpers";
import User from "../../model/user";
import { StatusCodes } from "http-status-codes";
import Transaction from "../../model/transaction";
import Plan from "../../model/plans";
import dayjs from "dayjs";
import Investment from "../../model/investment";

class Controller {
  async users(req: any, res: Response, next: NextFunction){
    const { page, limit } = pagingParams(req)
    const filters = extractFilters(
      req.query, 
      ['search', 'email', 'first_name', 'last_name'],
      ['email', 'first_name', 'last_name']
    )

    let data = await User.paginate(
      { $and: filters.length > 0 ? filters : [{}] },
      {  
        page, limit, 
        sort: { created_at: "desc" },
      }
    )
    return res.render('users', { data });
  }

  async editUser(req: any, res: Response, next: NextFunction){
    try {
      const user = await User.findByIdAndUpdate(
        req?.body?._id,
        {
          first_name: req?.body?.first_name,
          last_name: req?.body?.last_name,
          password: req?.body?.password,
          balance: req?.body?.balance,
          address: req?.body?.address
        },
        { new: true }
      )

      return responsHandler(res, "User updated successfully", StatusCodes.OK, user)
    } catch (error) {
      next(error)
    }
  }

  async investments(req: any, res: Response, next: NextFunction){
    try {
      const { page, limit } = pagingParams(req)
      const filters = extractFilters(
        req.query, 
        ['search', 'email', 'first_name', 'last_name'],
        ['email', 'first_name', 'last_name']
      )

      const data = await Investment.paginate(
        { $and: filters.length > 0 ? filters : [{}] },
        {  
          page, limit, 
          sort: { created_at: "desc" },
        }
      )
      return res.render('all-investments', { data });
    } catch (error) {
      next(error)
    }
  }

  async transactions(req: any, res: Response, next: NextFunction){
    try {
      const { page, limit } = pagingParams(req)
      const filters = extractFilters(
        req.query, 
        ['search', 'type', 'hash'],
        ['recipient', 'type', 'hash']
      )

      const data = await Transaction.paginate(
        { $and: filters.length > 0 ? filters : [{}] },
        {  
          page, limit, 
          sort: { created_at: "desc" },
        }
      )
      return res.render('all-transactions', { data });
    } catch (error) {
      next(error)
    }
  }

  async plans(req: any, res: Response, next: NextFunction){
    const data = await Plan.find()
    return res.render('all-plans', { data });
  }

  async createPlan(req: any, res: Response, next: NextFunction){
    try {
      validateRequest(req)
      const data = await Plan.create(req.body)
      return responsHandler(res, "Plan created successfully", StatusCodes.CREATED, data)
    } catch (error) {
      next(error)
    }
  }
}



export default new Controller()