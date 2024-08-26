import { Response, NextFunction } from "express";
import { extractFilters, pagingParams, responsHandler, validateRequest } from "../../utility/helpers";
import User from "../../model/user";
import { StatusCodes } from "http-status-codes";
import Transaction from "../../model/transaction";
import Plan from "../../model/plans";
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

  async editInvestment(req: any, res: Response, next: NextFunction){
    try {
      const tx = await Investment.findByIdAndUpdate(
        req?.body?._id,
        {
          plan: req?.body?.plan,
          capital: req?.body?.capital,
          profit: req?.body?.profit,
          status: req?.body?.status
        },
        { new: true }
      )
      return responsHandler(
        res, "Investment updated successfully", 
        StatusCodes.OK, tx
      )
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

  async editTxn(req: any, res: Response, next: NextFunction){
    try {
      const tx = await Transaction.findByIdAndUpdate(
        req?.body?._id,
        {
          type: req?.body?.type,
          amount: req?.body?.amount,
          currency: req?.body?.currency,
          status: req?.body?.status,
          description: req?.body?.description,
        },
        { new: true }
      )
      return responsHandler(res, "Transaction updated successfully", StatusCodes.OK, tx)
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

  async editPlan(req: any, res: Response, next: NextFunction){
    try {
      const plan = await Plan.findByIdAndUpdate(
        req?.body?._id,
        {
          name: req?.body?.name,
          rate: req?.body?.rate,
          max_price: req?.body?.max_price,
          min_price: req?.body?.min_price
        },
        { new: true }
      )
      return responsHandler(res, "Plan updated successfully", StatusCodes.OK, plan)
    } catch (error) {
      next(error)
    }
  }
}



export default new Controller()