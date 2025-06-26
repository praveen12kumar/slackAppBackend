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

export { DB_NAME,JWT_EXPIRY,JWT_SECRET, MAIL_ID, MAIL_PASSWORD,MONGO_DB_URI, NODE_ENV, PORT };
