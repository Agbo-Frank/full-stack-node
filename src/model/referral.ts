import { Schema, Types, model } from "mongoose"

export interface IReferral {
  user: string | typeof Types.ObjectId
  referee: string | typeof Types.ObjectId
  reward: number
  completed: boolean
}

const referral = new Schema<IReferral>({
  user: String,
  referee: {
    type: Types.ObjectId,
    ref: "user"
  },
  reward: { type: Number, default: 0 },
  completed: {
    type: Boolean,
    default: false
  }
},{
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
}
)

const Referral = model<IReferral>("referral", referral)
export default Referral