import dayjs from "dayjs";
import Investment, { investment_status } from "../model/investment"
import Plan from "../model/plans";
import numeral from "numeral";
import cron from 'node-cron';
import User from "../model/user";

async function updateUsersInvestments(){
  const investments = await Investment.find({ status: investment_status.active })
  if(investments.length === 0) return;

  const plans = await Plan.find()
  investments.forEach(async inv => {
    if(dayjs().diff(inv.created_at, "hours") < 24) return;

    const plan = plans.find(p => p.id === inv.plan)
    const profit = numeral(inv.capital).multiply(plan.rate).multiply(0.01).divide(30).value()

    inv.profit = numeral(inv.profit).add(profit).value()
    await inv.save()
    await User.updateOne(
      { _id: inv.user },
      { $inc: { earnings: profit } }
    )
  })
}

export default async function initiateJobs() {
  try {
    cron.schedule(
      "*/1 * * * *",  //0 0 * * *
      updateUsersInvestments, 
      { timezone: "UTC" }
    );
    console.log("cron job set up successfully")
  } catch (error: any) {
    console.log("cron job set up failed")
  }
}