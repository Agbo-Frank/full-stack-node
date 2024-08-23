import dayjs from "dayjs";
import Transaction from "../../model/transaction";
import { isEmpty, pagingParams } from "../../utility/helpers";
import controller from "../user/controller";
import { Request, Response } from "express";
import Referral from "../../model/referral";
import { APP_URL } from "../../utility/config";

class Controller{
  async home(req: Request, res: Response){
    return res.render('index');
  }
  async login(req: Request, res: Response){
    return res.render('login');
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
  async dashboard(req: Request, res: Response){
    return res.render('dashboard');
  }
  async transactions(req: any, res: Response){
    const { page, limit } = pagingParams(req)

    let data = await Transaction.paginate(
      { user: req.user },
      { page, limit, sort: { created_at: "desc" } }
    )
    data = {
      ...data,
      docs: data.docs.map(d => ({
        ...d.toJSON(), 
        created_at: dayjs(d.created_at).format("DD MMM YYYY")
      }))
    }
    return res.render('transactions', { data });
  }
  async plans(req: Request, res: Response){
    return res.render('plans');
  }
  async investments(req: Request, res: Response){
    return res.render('investments');
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
    const data = await Referral.find({ user: req.user }).populate("refere", "first_name last_name")
    const balance = data.reduce((acc, d) => acc + d.reward, 0)
    return res.render('referrals', { balance, data, link });
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