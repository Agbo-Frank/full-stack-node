import { Response, NextFunction } from "express";
declare class Controller {
    donation(req: any, res: Response, next: NextFunction): Promise<void>;
}
declare const _default: Controller;
export default _default;
