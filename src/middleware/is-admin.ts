import { NextFunction, Request, Response } from "express";
import { UnauthorizedException } from "../utility/service-error";

export default function isAdmin(req: any, res: Response, next: NextFunction){
  try{
    if(req.role !== "admin") throw new UnauthorizedException("Unauthorized user");
    next();
  }
  catch(error){
    next(error);
  }
}