import { MailOptions } from "nodemailer/lib/sendmail-transport";
declare class MailService {
    private config;
    constructor();
    send(payload: MailOptions): Promise<void>;
    sendOTP(email: string): Promise<{
        message: string;
    }>;
    sendWithTemplate(payload: any): Promise<void>;
    onRegistration(email: string, name: string): Promise<{
        message: string;
        status: boolean;
    }>;
    onDeposit(email: string, name: string, order: {
        amount: string;
        ref: string;
        currency: string;
    }): Promise<{
        message: string;
        status: boolean;
    }>;
    onDonation(email: string, name: string): Promise<{
        message: string;
        status: boolean;
    }>;
    onTxUpdate(payload: any): Promise<{
        message: string;
        status: boolean;
    }>;
    onWithdrawal(email: string, name: string, order: {
        amount: string;
        ref: string;
        currency: string;
        address: string;
    }): Promise<{
        message: string;
        status: boolean;
    }>;
    resetLink(email: string): Promise<{
        message: string;
    }>;
    verifyOTP(email: string, code: string): Promise<import("mongoose").Document<unknown, {}, import("../model/user").IUser> & import("../model/user").IUser & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    private txmail_content;
}
declare const _default: MailService;
export default _default;
