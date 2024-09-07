import { PaginateModel } from "mongoose";
export interface IUser {
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    earnings: number;
    password: string;
    avatar: string;
    balance: number;
    address: string;
    verified: boolean;
    otp_expiry: string;
    otp: string;
    role: string;
    referral_code: string;
    kyc_docs: string;
    created_at: string;
}
declare const User: PaginateModel<IUser, {}, {}>;
export default User;
