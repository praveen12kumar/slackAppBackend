import express from 'express';

import { createOrderController } from '../../controllers/paymentController.js';
import { isAuthenticated } from '../../middleware/authMiddleware.js';

const paymentRouter = express.Router();

paymentRouter.post('/order', isAuthenticated, createOrderController);


export default paymentRouter;