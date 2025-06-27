import express from 'express';

import { getMessagesController } from '../../controllers/messageController.js';
import { isAuthenticated } from '../../middleware/authMiddleware.js';
const messageRouter = express.Router();


messageRouter.get('/:channelId', isAuthenticated, getMessagesController) 


export default messageRouter;