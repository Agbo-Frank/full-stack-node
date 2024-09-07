import { PaginateModel } from "mongoose";
export declare const investment_status: Readonly<{
    active: "active";
    inactive: "inactive";
    completed: "completed";
}>;
export interface IInvestment {
    plan: string;
    capital: number;
    profit: number;
    due_at: string | any;
    user: string;
    status: string;
    updated_at: string;
    created_at: string;
}
declare const Investment: PaginateModel<IInvestment, {}, {}>;
export default Investment;
