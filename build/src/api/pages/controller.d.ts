import { Request, Response } from "express";
declare class Controller {
    home(req: Request, res: Response): Promise<void>;
    login(req: Request, res: Response): Promise<void>;
    register(req: Request, res: Response): Promise<void>;
    policy(req: Request, res: Response): Promise<void>;
    dashboard(req: Request, res: Response): Promise<void>;
    transactions(req: any, res: Response): Promise<void>;
    plans(req: Request, res: Response): Promise<void>;
    investments(req: Request, res: Response): Promise<void>;
    settings(req: Request, res: Response): Promise<void>;
    deposit(req: Request, res: Response): Promise<void>;
    withdraw(req: Request, res: Response): Promise<void>;
    contact(req: Request, res: Response): Promise<void>;
    referrals(req: Request, res: Response): Promise<void>;
    kyc(req: Request, res: Response): Promise<void>;
    forgetpassword(req: Request, res: Response): Promise<void>;
    error(req: Request, res: Response): Promise<void>;
}
declare const _default: Controller;
export default _default;
