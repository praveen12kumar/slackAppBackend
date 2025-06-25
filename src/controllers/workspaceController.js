
import { StatusCodes } from "http-status-codes";

import logger from "../config/logger.config.js";
import { createWorkspaceService } from "../services/workspaceService.js";
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