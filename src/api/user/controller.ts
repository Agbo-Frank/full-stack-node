import { Response, NextFunction } from "express";
import { pagingParams, responsHandler, validateRequest } from "../../utility/helpers";
import User from "../../model/user";
import { BadRequestException, NotFoundException } from "../../utility/service-error";
import { StatusCodes } from "http-status-codes";
import cloudinary from "../../utility/cloudinary";
import Transaction from "../../model/transaction";
import numeral from "numeral";
import Referral from "../../model/referral";

class Controller {
  async profile(req: any, res: Response, next: NextFunction){
    try {
      const user = await User.findById(req.user).select("-password")
      if(!user) throw new NotFoundException("user not found");

      return responsHandler(
        res, 
        "User profile retrieved successfully", 
        StatusCodes.OK, 
        user
      )
    } catch (error) {
      next(error)
    }
  }

  async update(req: any, res: Response, next: NextFunction){
    try {
      validateRequest(req)
      const payload = req.body

      let user = await User.findById(req.user)
      if(!user) throw new NotFoundException("user not found");

      user = await User.findByIdAndUpdate(req.user, {
        first_name: payload?.first_name,
        last_name: payload?.last_name,
        avatar: payload?.avatar,
        phone_number: payload?.phone_number,
        address: payload?.address
      }, { new: true })

      return responsHandler(res, "User profile updated successfully", StatusCodes.CREATED, user)
    } catch (error) {
      next(error)
    }
  }

  async uploadAvatar(req: any, res: Response, next: NextFunction){
    try {
      validateRequest(req)

      const result = await cloudinary.uploader.upload(req?.body.image, {folder: '/okafor/photos'})
      if(!result) throw new BadRequestException(`Unable to upload avatar`);

      await User.updateOne(
        { _id: req.user },
        { avatar: result?.secure_url }
      )

      return responsHandler(
        res, "Password updated successfully", 
        StatusCodes.OK, { url: result?.secure_url }
      )
    } catch (error) {
      next(error)
    }
  }

  async changePassword(req: any, res: Response, next: NextFunction){
    try {
      validateRequest(req)
      const { old_password, new_password } = req.body

      let user = await User.findById(req.user)
      if(!user) throw new NotFoundException("user not found");

      if(old_password !== user.password) {
        throw new BadRequestException(`Incorrect password`);
      }

      await user.updateOne({ password: new_password })

      return responsHandler(res, "Password updated successfully")
    } catch (error) {
      next(error)
    }
  }

  async transactions(req: any, res: Response, next: NextFunction){
    try {
      const { page, limit } = pagingParams(req)
      const txs = await Transaction.paginate(
        { user: req.user },
        { page, limit }
      )
      return responsHandler(res, "Transactions retrieved successfully", StatusCodes.OK, txs)
    } catch (error) {
      next(error)
    }
  }

  async deposit(req: any, res: Response, next: NextFunction){
    try {
      validateRequest(req)
      const { amount, hash, currency } = req.body
      const tx = await Transaction.create({
        user: req.user,
        type: "deposit",
        currency,
        amount, hash,
        status: "pending",
        description: "Wallet funding",
      })
      return responsHandler(res, "Deposit intiated, wait for confirmation ", StatusCodes.OK, tx)
    } catch (error) {
      console.log("errr:", error)
      // next(error)
    }
  }

  async withdraw(req: any, res: Response, next: NextFunction){
    try {
      validateRequest(req)
      const { amount, address } = req.body
      const user = await User.findById(req.user)
      if(!user) throw new BadRequestException("user not found");

      if(user.balance < Number(amount)) throw new BadRequestException("Insufficient balance to withdraw");
      user.balance = numeral(user.balance).subtract(amount).value()

      await user.save()

      const tx = await Transaction.create({
        user: user.id,
        type: "withdraw",
        status: "pending",
        recipient: address,
        amount: -amount,
        description: `Withdrawal request` 
      })
      return responsHandler(res, "Deposit intiated, wait for confirmation ", StatusCodes.OK, tx)
    } catch (error) {
      next(error)
    }
  }

  async referrals(req: any, res: Response, next: NextFunction){
    try {
      const data = await Referral.find({ user: req.user })
      const balance = data.reduce((acc, d) => acc + d.reward, 0)

      return responsHandler(
        res, "Referrals retrived successfully", 
        StatusCodes.OK, { balance, refferees: data }
      )
    } catch (error) {
      next(error)
    }
  }
}
export default new Controller()