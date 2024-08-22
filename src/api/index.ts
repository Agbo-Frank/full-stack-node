import { Application } from "express";
import user from "./user/routes"
import auth from "./auth/routes"
import pages from "./pages/routes"
import investment from "./investment/routes"
import admin from "./admin/routes"
import guard, { guardValid } from "../middleware/guard";
import isAdmin from "../middleware/is-admin";

export default function(app: Application){
  app.use(pages)
  app.use("/user", user)
  app.use("/auth", auth)
  app.use("/investment", investment)
  app.use("/admin", guardValid, guard, isAdmin, admin)
}