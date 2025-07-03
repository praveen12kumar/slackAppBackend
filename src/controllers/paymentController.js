import { StatusCodes } from 'http-status-codes';

import razorpay from '../config/razorpay-config.js'
import { CURRENCY, RECEIPT_SECRET } from "../config/serverConfig.js";
import { createPaymentService, updatePaymentStatusService } from '../services/paymentService.js';
import InternalServerError from '../utils/errors/internalServer.js';


export const createOrderController = async(req, res, next) => {
    try {
        const options = {
            amount: req.body.amount * 100,
            currency: CURRENCY,
            receipt: RECEIPT_SECRET,
            payment_capture: 1
        }

        const order = await razorpay.orders.create(options);

        if(!order){
            throw new Error("Error in creating order");
        }

        await createPaymentService(order.id, order.amount);

        return res.status(StatusCodes.OK)
                  .json({
                    status: true,
                    message: "Order created successfully",
                    data: order,
                    error:{}
                  });

    } catch (error) {
        console.log('Error in creating order', error);
        return next (new InternalServerError(error.message));
    }
}



export const capturePaymentController = async(req, res, next) =>{
    try {
        
        const {orderId, status, paymentId, signature} = req.body;
       
        await updatePaymentStatusService({orderId, status, paymentId, signature})

        return res.status(StatusCodes.OK).json({
            success:true,
            message:"Payment captured successfully",
        })

    } catch (error) {
        console.log('Error in capturing payment', error);
          return next (new InternalServerError(error.message));   
    }
}