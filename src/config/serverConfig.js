import { config } from 'dotenv';
import { DB_NAME } from '../utils/constants.js';
config();

const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';
const MONGO_DB_URI = process.env.MONGO_DB_URI;

export { PORT, NODE_ENV, MONGO_DB_URI, DB_NAME };
