import { NextFunction, Response } from "express";
export default function guard(req: any, res: Response, next: NextFunction): Promise<void>;
