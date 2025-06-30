import express from 'express';

import { addChannelToWorkspaceController, 
        addMemberToWorkspaceController, 
        createWorkspaceController, 
        deleteWorkspaceController,
        getWorkspaceController, 
        getWorkspaceDetailsByJoinCodeController,
        getWorkspacesUserIsMemberOfController,
        joinWorkspaceController,
        resetJoinCodeController,
        updatedWorkspaceController    } from '../../controllers/workspaceController.js';
import {isAuthenticated} from "../../middleware/authMiddleware.js";
import { addChannelToWorkspaceSchema, 
        addMemberToWorkspaceSchema, 
        workspaceSchema } 
        from '../../validators/workspaceSchema.js';
import { validate } from '../../validators/zodValidate.js';

const router = express.Router();

router.post('/', isAuthenticated,  
                 validate(workspaceSchema), 
                 createWorkspaceController);

router.get('/', 
            isAuthenticated, 
            getWorkspacesUserIsMemberOfController);

router.delete('/:workspaceId', 
                isAuthenticated, 
                deleteWorkspaceController);

router.get('/:workspaceId',  
            isAuthenticated, 
            getWorkspaceController);

router.get('/join/:joinCode', 
            isAuthenticated, 
            getWorkspaceDetailsByJoinCodeController);
            
router.put('/:workspaceId/Join', 
                isAuthenticated, 
                joinWorkspaceController
        );

router.put('/:workspaceId', 
            isAuthenticated, 
            updatedWorkspaceController);

router.put('/:workspaceId/members',  
        isAuthenticated, 
        validate(addMemberToWorkspaceSchema), 
        addMemberToWorkspaceController);

router.post('/:workspaceId/channels', 
             isAuthenticated, 
             validate(addChannelToWorkspaceSchema),
             addChannelToWorkspaceController);

router.put('/:workspaceId/JoinCode/reset', 
                isAuthenticated, 
                resetJoinCodeController
        );





export default router;