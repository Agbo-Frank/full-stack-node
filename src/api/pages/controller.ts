import controller from "../user/controller";
import { Request, Response } from "express";

class Controller{
  async home(req: Request, res: Response){
    return res.render('index');
  }
  async login(req: Request, res: Response){
    return res.render('login');
  }
  async register(req: Request, res: Response){
    return res.render('register');
  }
  async policy(req: Request, res: Response){
    return res.render('policy');
  }
  async dashboard(req: Request, res: Response){
    return res.render('dashboard');
  }
  async transactions(req: Request, res: Response){
    return res.render('transactions');
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
  async referrals(req: Request, res: Response){
    return res.render('referrals');
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