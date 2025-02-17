import dayjs from "dayjs"
import { Schema, Types, model } from "mongoose"

export interface IReferral {
  user: string | typeof Types.ObjectId
  referee: string | typeof Types.ObjectId
  reward: number
  completed: boolean
  paid: boolean
  created_at: string
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
  },
  paid: {
    type: Boolean,
    default: false
  },
  created_at: {
    type: String,
    get(v) {
      return dayjs(v).format("DD MMM YYYY")
    }
  }
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
}
)

const Referral = model<IReferral>("referral", referral)
export default Referral