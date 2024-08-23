import { Response, NextFunction } from "express";
declare class Controller {
    create(req: any, res: Response, next: NextFunction): Promise<void>;
    investments(req: any, res: Response, next: NextFunction): Promise<void>;
    withdraw(): Promise<void>;
}
declare const _default: Controller;
export default _default;
