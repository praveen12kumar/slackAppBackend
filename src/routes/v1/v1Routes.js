import express from 'express';

import channelRouter from './channelRoutes.js';
import usersRouter from "./users.js";
import workspaceRouter from "./workspaceRoute.js";


const router = express.Router();


router.use('/users', usersRouter);
router.use('/workspaces', workspaceRouter);
router.use('/channels', channelRouter);

export default router;