import { PaginateModel } from "mongoose";
export declare const investment_status: Readonly<{
    PENDING: "pending";
    CANCELED: "canceled";
    RUNNING: "running";
    SUSPENSION: "suspension";
    WITHDRAWN: "withdrawn";
}>;
export interface IInvestment {
    plan_name: string;
    plan_id: string;
    capital: number;
    profit: number;
    user: string;
    status: string;
    updated_at: string;
    created_at: string;
}
declare const Investment: PaginateModel<IInvestment, {}, {}>;
export default Investment;
