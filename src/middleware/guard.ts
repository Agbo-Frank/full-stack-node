import { NextFunction, Request, Response } from "express";
import { validateRequest } from "../utility/helpers";
import jwt from "../utility/jwt";
import User from "../model/user";

export default async function guard(req: any, res: Response, next: NextFunction){
  try{
    validateRequest(req)
    const token = req.cookies?.jwt;
    if(!token) return res.redirect('/login');

    const decoded = jwt.verify(token);
    if(!decoded) return res.redirect('/login');

    req.user = decoded?.id;
    const user = await User.findById(decoded?.id)
    req.role = user?.role;
    next();
  }
  catch(error){
    next(error)
  }
}