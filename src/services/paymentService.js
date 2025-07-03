import paymentRepository from "../repository/paymentRepository.js"

export const createPaymentService = async (orderId, amount)=>{
    const payment = await paymentRepository.create({orderId, amount});
    return payment
}


export const updatePaymentStatusService = async({orderId, status, paymentId}) =>{
    //console.log("orderId", orderId, "status", status, "paymentId", paymentId);

    const payment = await paymentRepository.updateOrder(orderId, {status, paymentId});

    return payment
}