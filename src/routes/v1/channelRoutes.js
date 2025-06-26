import express from 'express';

import { getChannelByIdController } from '../../controllers/channelController.js';
import {isAuthenticated} from "../../middleware/authMiddleware.js";

const channelRouter = express.Router();


channelRouter.get('/:channelId', isAuthenticated, getChannelByIdController)


export default channelRouter;