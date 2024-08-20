import { Schema, model, PaginateModel, Types } from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

export interface ITransaction {
  user: string
  type: string //withdraw, deposit, mint commision
  amount: number
  status: string //"pending", "approved", "declined"
  description: string
  recipient: string
  hash: string
}

const tx = new Schema<ITransaction>({
  user: String,
  type: String,
  amount: Number,
  hash: String,
  status: String,
  description: String,
  recipient: { type: String }
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
})

tx.plugin(mongoosePaginate);

const Transaction = model<ITransaction, PaginateModel<ITransaction>>("transaction", tx)
export default Transaction