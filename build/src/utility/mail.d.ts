import { MailOptions } from "nodemailer/lib/sendmail-transport";
declare class MailService {
    private config;
    constructor();
    send(payload: MailOptions): Promise<void>;
    sendOTP(email: string): Promise<{
        message: string;
    }>;
    verifyOTP(email: string, code: string): Promise<import("mongoose").Document<unknown, {}, import("../model/user").IUser> & import("../model/user").IUser & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
declare const _default: MailService;
export default _default;
