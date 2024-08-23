import { Response, NextFunction } from "express";
declare class Controller {
    login(req: any, res: Response, next: NextFunction): Promise<void>;
    register(req: any, res: Response, next: NextFunction): Promise<void>;
    sendOTP(req: any, res: Response, next: NextFunction): Promise<void>;
    verifyOTP(req: any, res: Response, next: NextFunction): Promise<void>;
    logout(req: any, res: Response, next: NextFunction): Promise<void>;
}
declare const _default: Controller;
export default _default;
