import { Worker } from "bullmq";

import {transporter} from "../config/mailConfig.js";
import redisConfig from "../config/redisConfig.js";


new Worker('mailQueue', async(job)=>{
    const emailData = job.data;
    console.log("Process email", emailData);

    try {
        await transporter.sendMail(emailData);
        //console.log("Email sent successfully", res);

    } catch (error) {
        console.log(`Error in processing email: ${error}`);

    }
},{connection: redisConfig})