import { config } from 'dotenv';

import { DB_NAME } from '../utils/constants.js';
config();

const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';
const MONGO_DB_URI = process.env.MONGO_DB_URI;
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRY = process.env.JWT_EXPIRY || '1d';


export { DB_NAME,JWT_EXPIRY,JWT_SECRET, MONGO_DB_URI, NODE_ENV, PORT };
