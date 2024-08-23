import { NextFunction, Request, Response } from "express";
import { validateRequest } from "../utility/helpers";
import jwt from "../utility/jwt";

export default function guard(req: any, res: Response, next: NextFunction){
  try{
    validateRequest(req)
    const token = req.cookies?.jwt;
    if(!token) return res.redirect('/login');

    const decoded = jwt.verify(token);
    if(!decoded) return res.redirect('/login');

    req.user = decoded?.id;
    req.role = decoded?.role;
    next();
  }
  catch(error){
    next(error)
  }
}