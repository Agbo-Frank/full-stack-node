import { Schema } from "mongoose";
export interface IPlan {
    name: string;
    description: string;
    rate: number;
    max_price: number | null;
    min_price: number;
}
declare const Plan: import("mongoose").Model<IPlan, {}, {}, {}, import("mongoose").Document<unknown, {}, IPlan> & IPlan & {
    _id: import("mongoose").Types.ObjectId;
}, Schema<IPlan, import("mongoose").Model<IPlan, any, any, any, import("mongoose").Document<unknown, any, IPlan> & IPlan & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, IPlan, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<IPlan>> & import("mongoose").FlatRecord<IPlan> & {
    _id: import("mongoose").Types.ObjectId;
}>>;
export default Plan;
