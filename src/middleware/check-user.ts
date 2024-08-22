import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken"
import User from "../model/user";
import { JWT_SECRET_KEY } from "../utility/config";

export default async function checkUser(req: Request, res: Response, next: NextFunction){
  res.locals.user = null;
  try {
    const token = req.cookies?.jwt;
    if(token){
      const decoded: any = jwt.verify(token, JWT_SECRET_KEY);
      if(decoded){
        const user = await User.findById(decoded.id);
        console.log(user)
        res.locals.user = user;
        res.locals.role = decoded.role;
        next();
      }
    }
    next();
  } catch (error) {
    next();
  }
};