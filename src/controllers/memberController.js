import { StatusCodes } from "http-status-codes";

import { isMemberPartOfWorkspaceService } from "../services/memberService.js" 
import { customErrorResponse } from "../utils/common/responseObject.js";
import { successResponse } from "../utils/common/responseObject.js";
import { InternalServerError } from "../utils/errors/index.js";

export const isMemberPartOfWorkspaceController = async(req, res, next)=>{
    try {
        const response = await isMemberPartOfWorkspaceService(req.params.workspaceId, req.user);

        return res.status(StatusCodes.OK).json(successResponse(response, "Member fetched successfully"));
    } catch (error) {
        if(error.statusCode) {
            return res.status(error.statusCode).json(customErrorResponse(error));
        }
        return next (new InternalServerError(error.message));
    }
}