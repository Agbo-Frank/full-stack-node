import { NextFunction, Response } from "express";

export default function isAdmin(req: any, res: Response, next: NextFunction){
  try{
    if(req.role !== "admin") return res.redirect('/login');
    next();
  }
  catch(error){
    next(error);
  }
}