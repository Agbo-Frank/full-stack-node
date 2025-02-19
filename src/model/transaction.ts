import dayjs from "dayjs";
import { Schema, model, PaginateModel, Types } from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

export interface ITransaction {
  user: string
  type: string //withdraw, deposit, commission charge
  amount: number
  currency: string
  network: string
  status: string //"pending", "approved", "declined"
  description: string
  recipient: string
  hash: string
  created_at?: string
}

const tx = new Schema<ITransaction>({
  user: {
    type: String,
    ref: "user"
  },
  type: String,
  currency: String,
  amount: Number,
  hash: String,
  network: String,
  status: String,
  description: String,
  recipient: { type: String }
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  },

})

tx.plugin(mongoosePaginate);

const Transaction = model<ITransaction, PaginateModel<ITransaction>>("transaction", tx)
export default Transaction