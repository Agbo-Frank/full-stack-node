import dayjs from "dayjs";
import Investment, { investment_status } from "../model/investment"
import Plan from "../model/plans";
import numeral from "numeral";
import cron from 'node-cron';
import User from "../model/user";
import mongoose from "mongoose";
import { MONGODB_URL } from "../utility/config";

async function updateUsersInvestments(){
  console.log("Updating investment initialized...")
  const investments = await Investment.find({ status: investment_status.active })
  if(investments.length === 0) return;

  const plans = await Plan.find()
  investments.forEach(async inv => {
    if(dayjs().diff(inv.created_at, "hours") < 24) return;

    const plan = plans.find(p => p.id === inv.plan)
    const profit = numeral(inv.capital).multiply(plan.rate).multiply(0.01).divide(plan?.duration).value()

    inv.profit = numeral(inv.profit).add(profit).value()
    await inv.save()
    await User.updateOne(
      { _id: inv.user },
      { $inc: { earnings: profit } }
    )
  })

  console.log("Updating investment completed...")
}

export default async function initiateJobs() {
  try {
    cron.schedule(
      "0 0 * * *",  //0 0 * * *
      updateUsersInvestments, 
      { timezone: "UTC" }
    );
    console.log("cron job set up successfully")
  } catch (error: any) {
    console.log("cron job set up failed")
  }
}


// mongoose.connect(MONGODB_URL as string, {autoIndex: false})
//   .then(async () => {
//     console.log("MongoDB connected successfully...");
    
//     await updateUsersInvestments()
//   })
//   .catch((err) => console.log("MongoDB Error just occured " + err))
