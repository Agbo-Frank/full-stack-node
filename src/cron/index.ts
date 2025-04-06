import dayjs from "dayjs";
import Investment, { investment_status } from "../model/investment"
import Plan from "../model/plans";
import numeral from "numeral";
import cron from 'node-cron';
import User from "../model/user";

async function updateUsersInvestments() {
  console.log("Updating investment initialized...")
  const investments = await Investment.find({ status: investment_status.active })
  if (investments.length === 0) return;

  const plans = await Plan.find()
  investments.forEach(async inv => {
    if (dayjs().diff(inv.created_at, "hours") < 24) return;

    const plan = plans.find(p => p.id === inv.plan)
    const profit = numeral(inv.capital).multiply(plan.rate).multiply(0.01).value()

    await inv.updateOne({ $inc: { profit } })
    await User.updateOne(
      { _id: inv.user },
      {
        $inc: {
          earnings: profit,
        }
      }
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