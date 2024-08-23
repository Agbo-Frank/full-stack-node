import { Response, NextFunction } from "express";
declare class Controller {
    users(req: any, res: Response, next: NextFunction): Promise<void>;
    investments(req: any, res: Response, next: NextFunction): Promise<void>;
    transactions(req: any, res: Response, next: NextFunction): Promise<void>;
    plans(req: any, res: Response, next: NextFunction): Promise<void>;
}
declare const _default: Controller;
export default _default;
