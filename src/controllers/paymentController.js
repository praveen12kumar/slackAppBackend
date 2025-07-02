import { StatusCodes } from 'http-status-codes';

import razorpay from '../config/razorpay-config.js'
import { CURRENCY, RECEIPT_SECRET } from "../config/serverConfig.js";
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