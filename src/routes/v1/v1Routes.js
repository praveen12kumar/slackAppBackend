import express from 'express';

import usersRouter from "./users.js";
import workspaceRouter from "./workspaceRoute.js";

const router = express.Router();


router.use('/users', usersRouter);
router.use('/workspaces', workspaceRouter);

export default router;