import '../processors/mailProcessors.js';

import mailQueue from "../queues/mailQueue.js"

export const addEmailToMailQueue = async(emailData)=>{
    console.log('initializing mail queue');
    try {
       await mailQueue.add(emailData);
       console.log("Email added to mail queue");
    } catch (error) {
        console.log(`Error in adding email to mail queue: ${error}`);
    }
}