import { PaginateModel, Schema, model } from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

export const investment_status = Object.freeze({
  "PENDING": "pending",
  "CANCELED": "canceled",
  "RUNNING": "running",
  "SUSPENSION": "suspension",
  "WITHDRAWN": "withdrawn"
})

export interface IInvestment {
  plan_name: string
  plan_id: string
  capital: number 
  profit: number
  user: string
  status: string
  updated_at: string
  created_at: string
}

const investmentSchema = new Schema<IInvestment>({
  plan_name: String,
  plan_id: String,
  user: String,
  capital: { type: Number, default: 0 }, 
  profit: { type: Number, default: 0 },
  status: {
    type: String,
    enum: Object.values(investment_status),
    default: investment_status.PENDING
  }
},{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
})

investmentSchema.plugin(mongoosePaginate);
const Investment = model<IInvestment, PaginateModel<IInvestment>>("investment", investmentSchema)
export default Investment