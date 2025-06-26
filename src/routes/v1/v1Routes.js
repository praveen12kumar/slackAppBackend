import express from 'express';

import channelRouter from './channelRoutes.js';
import memberRouter from './memberRoutes.js';
import usersRouter from "./users.js";
import workspaceRouter from "./workspaceRoute.js";

const router = express.Router();


router.use('/users', usersRouter);
router.use('/workspaces', workspaceRouter);
router.use('/channels', channelRouter);
router.use('/members', memberRouter);


export default router;