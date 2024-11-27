import { Response, NextFunction } from "express";
declare class Controller {
    profile(req: any, res: Response, next: NextFunction): Promise<void>;
    update(req: any, res: Response, next: NextFunction): Promise<void>;
    uploadAvatar(req: any, res: Response, next: NextFunction): Promise<void>;
    changePassword(req: any, res: Response, next: NextFunction): Promise<void>;
    transactions(req: any, res: Response, next: NextFunction): Promise<void>;
    deposit(req: any, res: Response, next: NextFunction): Promise<void>;
    withdraw(req: any, res: Response, next: NextFunction): Promise<void>;
    referalWithdrawl(req: any, res: Response, next: NextFunction): Promise<void>;
    referrals(req: any, res: Response, next: NextFunction): Promise<void>;
    kyc(req: any, res: Response, next: NextFunction): Promise<void>;
    contact(req: any, res: Response, next: NextFunction): Promise<void>;
}
declare const _default: Controller;
export default _default;
