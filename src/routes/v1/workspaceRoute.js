import express from 'express';

import { createWorkspaceController } from '../../controllers/workspaceController.js';
import {isAuthenticated} from "../../middleware/authMiddleware.js";
import { workspaceSchema } from '../../validators/workspaceSchema.js';
import { validate } from '../../validators/zodValidate.js';

const router = express.Router();

router.post('/',  isAuthenticated,  validate(workspaceSchema), createWorkspaceController);

export default router;