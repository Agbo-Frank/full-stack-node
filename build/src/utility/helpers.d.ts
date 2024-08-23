import { Response, Request } from "express";
import { FilterQuery } from "mongoose";
export declare function randNum(len?: number): string;
export declare const randAlphaNum: (len?: number) => string;
export declare const compareStrings: (str1: string, str2: string) => boolean;
export declare const isEmpty: (mixedVar: any) => boolean;
export declare const maskEmail: (email: string) => string;
export declare const validateRequest: (req: Request) => void;
export declare const responsHandler: (res: Response, message: string, status?: number, data?: any) => void;
export declare const pagingParams: (req: Request) => {
    limit: number;
    page: number;
};
export declare const extractFilters: (payload: any, fields: string[], searchable_fields?: string[]) => FilterQuery<any>[];
export declare const getPrice: (base: string[], quote: string[]) => Promise<any>;
export declare const maskAddress: (address: string) => string;
