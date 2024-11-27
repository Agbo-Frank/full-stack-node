import { Response, Request, NextFunction } from "express";
export default function checkUser(req: Request, res: Response, next: NextFunction): Promise<void>;
