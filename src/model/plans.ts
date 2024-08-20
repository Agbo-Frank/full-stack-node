import { Schema, model } from "mongoose";

export interface IPlan {
    name: string
    description: string
    rate: number
    max_price: number | null
    min_price: number
}


const planSchema = new Schema<IPlan>({
    name: String,
    description: String,
    rate: Number,
    max_price: { type: Number, default: 0 },
    min_price: { type: Number, default: 0 }
})

const Plan = model("plan", planSchema)
export default Plan