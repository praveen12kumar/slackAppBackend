import express from 'express';

import { addMemberToWorkspaceController, createWorkspaceController, 
        deleteWorkspaceController,
        getWorkspaceController, 
        getWorkspaceDetailsByJoinCodeController,
        getWorkspacesUserIsMemberOfController,
        updatedWorkspaceController,
    } from '../../controllers/workspaceController.js';
import {isAuthenticated} from "../../middleware/authMiddleware.js";
import { workspaceSchema } from '../../validators/workspaceSchema.js';
import { validate } from '../../validators/zodValidate.js';

const router = express.Router();

router.post('/',  isAuthenticated,  validate(workspaceSchema), createWorkspaceController);
router.get('/', isAuthenticated, getWorkspacesUserIsMemberOfController);
router.delete('/:workspaceId', isAuthenticated, deleteWorkspaceController);
router.get('/:workspaceId',  isAuthenticated, getWorkspaceController);
router.get('/join/:joinCode', isAuthenticated, getWorkspaceDetailsByJoinCodeController);
router.put('/:workspaceId', isAuthenticated, updatedWorkspaceController);
router.put('/:workspaceId/members', isAuthenticated, addMemberToWorkspaceController);




export default router;