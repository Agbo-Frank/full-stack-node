import { PaginateModel } from "mongoose";
export interface ITransaction {
    user: string;
    type: string;
    amount: number;
    currency: string;
    status: string;
    description: string;
    recipient: string;
    hash: string;
}
declare const Transaction: PaginateModel<ITransaction, {}, {}>;
export default Transaction;
