import express from 'express';

import channelRouter from './channelRoutes.js';
import memberRouter from './memberRoutes.js';
import messageRouter from './messageRoutes.js';
import paymentRouter from './paymentRouter.js';
import usersRouter from "./users.js";
import workspaceRouter from "./workspaceRoute.js";

const router = express.Router();


router.use('/users', usersRouter);
router.use('/workspaces', workspaceRouter);
router.use('/channels', channelRouter);
router.use('/members', memberRouter);
router.use('/messages', messageRouter);
router.use('/payments', paymentRouter);

export default router;