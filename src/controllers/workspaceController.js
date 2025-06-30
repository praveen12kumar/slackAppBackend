
import { StatusCodes } from "http-status-codes";

import logger from "../config/logger.config.js";
import { addChannelToWorkspaceService, 
        addMemberToWorkspaceService, 
        createWorkspaceService, 
        deleteWorkspaceService, 
        getWorkspaceDetailsByJoinCodeService, 
        getWorkspaceService, 
        getWorkspacesUserIsMemberOfService, 
        joinWorkspaceService, 
        resetWorkspaceJoinCodeService, 
        updateWorkspaceService} 
        from "../services/workspaceService.js";
import { successResponse } from '../utils/common/responseObject.js';
import { customErrorResponse } from "../utils/common/responseObject.js";
import { InternalServerError } from "../utils/errors/index.js";




export const createWorkspaceController = async (req, res, next) => {
  try {
    const response = await createWorkspaceService({
      ...req.body,
      owner: req.user
    });

    return res
      .status(StatusCodes.CREATED)
      .json(successResponse(response, 'Workspace created successfully'));
  } catch (error) {
    logger.error(error);
    if (error.statusCode) {
      return res.status(error.statusCode).json(customErrorResponse(error));
    }

    return next (new InternalServerError(error.message));
  }
};


export const getWorkspacesUserIsMemberOfController = async(req, res, next) => {
    try {
        const response = await getWorkspacesUserIsMemberOfService(req.user);
        return res.status(StatusCodes.OK).json(
            successResponse(response, "Workspaces fetched successfully")
        )
    } catch (error) {
        if(error.statusCode) {
            return res.status(error.statusCode).json(customErrorResponse(error));
        }
        return next (new InternalServerError(error.message));
    }
}


export const deleteWorkspaceController = async(req, res, next) => {
    try {
        const response = await deleteWorkspaceService(req.params.workspaceId, req.user);
        return res.status(StatusCodes.OK).json(successResponse(response, "Workspace deleted successfully"));
    } catch (error) {
        if(error.statusCode) {
            return res.status(error.statusCode).json(customErrorResponse(error));
        }
        return next (new InternalServerError(error.message));
    }
}


export const getWorkspaceController = async(req, res, next) => {
    try {
        const response = await getWorkspaceService(req.params.workspaceId, req.user);
        
        return res.status(StatusCodes.OK).
                json(successResponse(response, "Workspace fetched successfully"));
    } 
    catch (error) {
        if(error.statusCode) {
            return res.status(error.statusCode).json(customErrorResponse(error));
        }
        return next (new InternalServerError(error.message));
    }
}

export const getWorkspaceDetailsByJoinCodeController = async(req, res, next) => {
    try {
        const response = await getWorkspaceDetailsByJoinCodeService(req.params.joinCode, req.user);
        
        return res.status(StatusCodes.OK).
                json(successResponse(response, "Workspace fetched successfully"));
    } catch (error) {
        if(error.statusCode) {
            return res.status(error.statusCode).json(customErrorResponse(error));
        }
        return next (new InternalServerError(error.message));
    }
}

export const updatedWorkspaceController = async(req, res, next) => {
    try {
    const response = await updateWorkspaceService(req.params.workspaceId, req.body, req.user);
    
    return res.status(StatusCodes.OK).json(successResponse(response, "Workspace updated successfully"));

    } catch (error) {
        if(error.statusCode) {
            return res.status(error.statusCode).json(customErrorResponse(error));
        }
        return next (new InternalServerError(error.message));
    }
}

//Todo: Add member with email

export const addMemberToWorkspaceController = async(req, res, next) => {
    try {
        const response = await addMemberToWorkspaceService(req.params.workspaceId, 
                                                            req.body.memberId, 
                                                            req.body.role || 'member',
                                                            req.user);

        return res.status(StatusCodes.OK).json(successResponse(response, "Member added to workspace successfully"));
    } catch (error) {
        if(error.statusCode) {
            return res.status(error.statusCode).json(customErrorResponse(error));
        }
        return next (new InternalServerError(error.message));
    }
}


export const addChannelToWorkspaceController = async(req, res, next) => {
    try {
        const response = await addChannelToWorkspaceService(req.params.workspaceId,
                                                            req.body.channelName,
                                                            req.user
                                                        )


           return res.status(StatusCodes.OK).json(successResponse(response, "Channel added to workspace successfully"));

    } catch (error) {
        if(error.statusCode) {
            return res.status(error.statusCode).json(customErrorResponse(error));
        }
        return next (new InternalServerError(error.message));
    }
}


export const resetJoinCodeController = async(req, res, next) => {
    
    try {
        const response = await resetWorkspaceJoinCodeService(req.params.workspaceId, req.user);

        return res.status(StatusCodes.OK)
        .json(successResponse(response, "Join code reset successfully"));

    } catch (error) {
        if(error.statusCode) {
            return res.status(error.statusCode).json(customErrorResponse(error));
        }
        return next (new InternalServerError(error.message));
    }
}

export const joinWorkspaceController = async(req, res, next) => {
    try {
        const response = await joinWorkspaceService(
                                req.params.workspaceId,
                                req.body.joinCode,
                                req.user);

         return res.status(StatusCodes.Ok)
                    .json(successResponse(response, "Workspace joined successfully"));                        
    } catch (error) {
        if(error.statusCode) {
            return res.status(error.statusCode).json(customErrorResponse(error));
        }
        return next (new InternalServerError(error.message))
    }
}
