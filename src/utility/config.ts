import 'dotenv/config'

export const NODE_ENV = process.env.NODE_ENV;
export const PORT = process.env.PORT;

export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

export const MONGODB_URL = process.env.MONGODB_URL;

export const MAIL_HOST = process.env.MAIL_HOST;
export const MAIL_PORT = process.env.MAIL_PORT;
export const MAIL_USER = process.env.MAIL_USER;
export const MAIL_PASS = process.env.MAIL_PASS;

export const NOTIFICATION_MAIL = process.env.NOTIFICATION_MAIL;
export const APP_URL = process.env.APP_URL;

export const CLOUDINARY_NAME = process.env.CLOUDINARY_NAME;
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;

export const NEWAPI_API_KEY = process.env.NEWAPI_API_KEY
