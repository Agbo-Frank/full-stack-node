import { PaginateModel } from "mongoose";
export interface ITransaction {
    user: string;
    type: string;
    amount: number;
    currency: string;
    network: string;
    status: string;
    description: string;
    recipient: string;
    hash: string;
    created_at?: string;
}
declare const Transaction: PaginateModel<ITransaction, {}, {}>;
export default Transaction;
