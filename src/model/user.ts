import { Schema, model, PaginateModel, Types } from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

export interface IUser {
  first_name: string
  last_name: string
  email: string
  phone_number: string
  referral_code: string
  password: string
  avatar: string
  balance: number
  address: string
  verified: boolean
  otp_expiry: string
  otp: string
  role: string
} 

const user = new Schema<IUser>({
  first_name: String,
  last_name: String,
  referral_code: String,
  phone_number: String,
  address: String,
  avatar: String,
  verified: {
    type: Boolean,
    default: false
  },
  email: {
    type: String,
    lowercase: true,
    index: true,
    unique: true
  },
  balance: {
    type: Number,
    default: 0
  },
  role: {
    type: String,
    trim: true,
    lowercase: true,
    default: "user",
    enum: ["admin", "user"]
  },
  password: String
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
})

user.plugin(mongoosePaginate);

const User = model<IUser, PaginateModel<IUser>>("user", user)
export default User