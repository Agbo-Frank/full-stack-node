import { Response, NextFunction } from "express";
import { extractFilters, pagingParams, responsHandler, validateRequest } from "../../utility/helpers";
import User from "../../model/user";
import { StatusCodes } from "http-status-codes";
import Transaction from "../../model/transaction";
import Plan from "../../model/plans";
import dayjs from "dayjs";

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
    data = {
      ...data,
      docs: data.docs.map(d => ({
        ...d.toJSON(), 
        created_at: dayjs(d.created_at).format("DD MMM YYYY")
      }))
    }
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

      return responsHandler(res, "User updated successfully")
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

      const data = await User.paginate(
        { $and: filters.length > 0 ? filters : [{}] },
        {  
          page, limit, 
          sort: { created_at: "desc" },
        }
      )
      return responsHandler(res, "Users retrieved successfully", StatusCodes.OK, data)
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
      return responsHandler(res, "Transactions retrieved successfully", StatusCodes.OK, data)
    } catch (error) {
      next(error)
    }
  }

  async plans(req: any, res: Response, next: NextFunction){
    try {
      const data = await Plan.find()
      return responsHandler(res, "Transactions retrieved successfully", StatusCodes.OK, data)
    } catch (error) {
      next(error)
    }
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