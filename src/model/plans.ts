import { Schema, model } from "mongoose";

export interface IPlan {
    name: string
    description: string
    rate: number
    duration: number
    max_price: number | null
    min_price: number
}


const plan = new Schema<IPlan>({
    name: String,
    description: String,
    rate: Number,
    duration: Number,
    max_price: { type: Number, default: 0 },
    min_price: { type: Number, default: 0 }
})

plan.set('toObject', { getters: true });
const Plan = model("plan", plan)
export default Plan