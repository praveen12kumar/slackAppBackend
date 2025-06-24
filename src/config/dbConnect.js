import mongoose from "mongoose";

import {DB_NAME,MONGO_DB_URI,NODE_ENV} from './serverConfig.js';


export default async function connectDB() {
    try {
        if(NODE_ENV === 'development') {
          await mongoose.connect(`${MONGO_DB_URI}/${DB_NAME}`);
        }
        else if(NODE_ENV === 'production') {
            //await mongoose.connect(MONGO_DB_URI);
        }
        console.log(`Connected to database from ${NODE_ENV} environment`);
    } catch (error) {
        console.log(`Error in connecting database: ${error}`);
        process.exit(1);
    }
}