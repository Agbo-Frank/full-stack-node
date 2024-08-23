import { Types } from "mongoose";
export interface IReferral {
    user: string | typeof Types.ObjectId;
    referee: string | typeof Types.ObjectId;
    reward: number;
    completed: boolean;
}
declare const Referral: import("mongoose").Model<IReferral, {}, {}, {}, import("mongoose").Document<unknown, {}, IReferral> & IReferral & {
    _id: Types.ObjectId;
}, any>;
export default Referral;
