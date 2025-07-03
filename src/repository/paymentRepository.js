import Payment from "../schema/paymentSchema.js";
import crudRepository from "./crudRepository.js";

const paymentRepository = {
    ...crudRepository(Payment),

    updateOrder: async function (order, data) {
        const updateDoc = await Payment.findOneAndUpdate({ orderId: order }, data, { new: true });

        return updateDoc;
    }
    
};

export default paymentRepository;