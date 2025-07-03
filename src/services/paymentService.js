import crypto from 'crypto';

import { RAZORPAY_KEY_SECRET } from '../config/serverConfig.js';
import paymentRepository from "../repository/paymentRepository.js"

export const createPaymentService = async (orderId, amount)=>{
    const payment = await paymentRepository.create({orderId, amount});
    return payment
}


export const updatePaymentStatusService = async({orderId, status, paymentId,signature }) =>{
    //console.log("orderId", orderId, "status", status, "paymentId", paymentId);
    if(status === 'success'){
        const sharesponse = crypto.createHmac('sha256', RAZORPAY_KEY_SECRET).update(`${orderId}|${paymentId}`).digest('hex')
        
        if(sharesponse === signature){
         await paymentRepository.updateOrder(orderId, {status, paymentId});
        }

        else{
            throw new Error("Payment Verification failed");
        }


    }
}