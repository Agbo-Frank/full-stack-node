import dayjs from "dayjs";
import { PaginateModel, Schema, model } from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

export const investment_status = Object.freeze({
  "active": "active",
  "inactive": "inactive",
  "completed": "completed"
})

export interface IInvestment {
  plan: string
  capital: number 
  profit: number
  due_at: string | any
  user: string
  status: string
  updated_at: string
  created_at: string
}

const investmentSchema = new Schema<IInvestment>({
  plan: String,
  user: { type: String, ref: "user" },
  capital: { type: Number, default: 0 }, 
  profit: { type: Number, default: 0 },
  status: {
    type: String,
    enum: Object.values(investment_status),
    default: investment_status.active
  },
  due_at: {
    type: Date,
  },
  created_at: {
    type: String,
    get(v){
      return dayjs(v).format("DD MMM YYYY")
    }
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