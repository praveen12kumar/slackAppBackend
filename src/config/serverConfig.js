import { config } from 'dotenv';

import { DB_NAME } from '../utils/constants.js';
config();

const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';
const MONGO_DB_URI = process.env.MONGO_DB_URI;
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRY = process.env.JWT_EXPIRY || '1d';
const MAIL_ID = process.env.MAIL_ID;
const MAIL_PASSWORD = process.env.MAIL_PASSWORD;
const REDIS_HOST = process.env.REDIS_HOST || 'localhost';
const REDIS_PORT = process.env.REDIS_PORT || 6379;
const APP_LINK = process.env.APP_LINK || 'http://localhost:3000';
const ENABLE_EMAIL_VERIFICATION  = process.env.ENABLE_EMAIL_VERIFICATION  || false;


export {         
        APP_LINK,
        DB_NAME,
        ENABLE_EMAIL_VERIFICATION,
        JWT_EXPIRY,
        JWT_SECRET, 
        MAIL_ID, 
        MAIL_PASSWORD,
        MONGO_DB_URI, 
        NODE_ENV, 
        PORT,
        REDIS_HOST,    
        REDIS_PORT    
    };
