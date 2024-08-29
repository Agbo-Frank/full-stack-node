import dayjs from "dayjs";
import Transaction from "../../model/transaction";
import { isEmpty, pagingParams } from "../../utility/helpers";
import controller from "../user/controller";
import { Request, Response } from "express";
import Referral from "../../model/referral";
import { APP_URL } from "../../utility/config";
import Plan from "../../model/plans";
import Investment from "../../model/investment";
import numeral from "numeral";

class Controller{
  async home(req: Request, res: Response){
    const plans = await Plan.find()
    return res.render('index', { data: plans });
  }
  async login(req: Request, res: Response){
    return res.render('login');
  }
  async fogetpassword(req: Request, res: Response){
    return res.render('foget-password');
  }
  async resetpassword(req: Request, res: Response){
    const { token } = req?.query
    if(isEmpty(token)){
      return res.redirect('/login');
    }
    return res.render('reset-password', { token });
  }
  async verifypassword(req: Request, res: Response){
    return res.render('verify-password');
  }
  async realestate(req: Request, res: Response){
    return res.render('real-estate');
  }
  async forex(req: Request, res: Response){
    return res.render('forex');
  }
  async cryptocurrencies(req: Request, res: Response){
    return res.render('cryptocurrencies');
  }
  async agriculture(req: Request, res: Response){
    return res.render('agriculture');
  }
  async register(req: Request, res: Response){
    let referral_code = null
    if(!isEmpty(req.params.id)){
      referral_code = req.params.id;
    }
    return res.render('register', { referral_code });
  }
  async policy(req: Request, res: Response){
    return res.render('policy');
  }
  async dashboard(req, res: Response){
    let data = await Transaction.paginate(
      { user: req.user },
      { sort: { created_at: "desc" } }
    )

    const total_deposit = data.docs.filter(t => t.type === "deposit" && t.status === "approved").reduce((acc, tx) => numeral(acc).add(tx.amount).value(), 0)
    const total_withdraw = data.docs.filter(t => t.type === "withdraw" && t.status === "approved").reduce((acc, tx) => numeral(acc).add(tx.amount).value(), 0)
    return res.render('dashboard', { tx: data.docs, total_deposit, total_withdraw });
  }
  async transactions(req: any, res: Response){
    const { page, limit } = pagingParams(req)

    let data = await Transaction.paginate(
      { user: req.user },
      { page, limit, sort: { created_at: "desc" }}
    )
    return res.render('transactions', { data });
  }
  async plans(req: Request, res: Response){
    const plans = await Plan.find()
    return res.render('plans', { data: plans });
  }
  async investments(req: any, res: Response){
    const { page, limit } = pagingParams(req)
    const data = await Investment.paginate(
      { user: req.user}, 
      { page, limit, sort: { created_at: "desc"}}
    )
    console.log(data)
    return res.render('investments', { data });
  }
  async settings(req: Request, res: Response){
    return res.render('settings');
  }
  async deposit(req: Request, res: Response){
    return res.render('deposit');
  }
  async withdraw(req: Request, res: Response){
    return res.render('withdraw');
  }
  async contact(req: Request, res: Response){
    return res.render('contact');
  }
  async referrals(req: any, res: Response){
    const link = APP_URL + "/register/" + res.locals.user?.referral_code
    const data = await Referral.find({ user: req.user, paid: false }).populate("referee", "first_name last_name")
    const balance = data.filter(d => d.completed).reduce((acc, d) => acc + d.reward, 0)
    const pending_balance = data.filter(d => !d.completed).reduce((acc, d) => acc + d.reward, 0)
    return res.render('referrals', { balance, pending_balance, data, link });
  }
  async kyc(req: Request, res: Response){
    return res.render('kyc');
  }
  async forgetpassword(req: Request, res: Response){
    return res.render('forget-password');
  }
  async error(req: Request, res: Response){
    return res.render('error');
  }
}

export default new Controller()