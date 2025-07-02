import express from 'express';

import { getMessagesController, getPresignedUrlFromAWS } from '../../controllers/messageController.js';
import { isAuthenticated } from '../../middleware/authMiddleware.js';
const messageRouter = express.Router();



messageRouter.get('/pre-signed-url', isAuthenticated, getPresignedUrlFromAWS);

messageRouter.get('/:channelId', isAuthenticated, getMessagesController) 


export default messageRouter;