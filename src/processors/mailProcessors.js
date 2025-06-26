import {transporter} from "../config/mailConfig.js";
import mailQueue from "../queues/mailQueue.js";

mailQueue.process(async(job)=>{
    const emailData = job.data;
    //console.log("Process email", emailData);

    try {
        await transporter.sendMail(emailData);
        //console.log("Email sent successfully", response);

    } catch (error) {
        console.log(`Error in processing email: ${error}`);

    }
})