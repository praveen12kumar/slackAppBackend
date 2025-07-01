
import { StatusCodes } from "http-status-codes";

import { getChannelByIdService } from "../services/channelService.js";
import { customErrorResponse } from "../utils/common/responseObject.js";
import { successResponse } from "../utils/common/responseObject.js";
import { InternalServerError } from "../utils/errors/index.js";

export const getChannelByIdController = async (req, res, next)=>{
    try {
        const response = await getChannelByIdService(req.params.channelId, req.user);
        
        return res.status(StatusCodes.OK).json(successResponse(response, "Channel fetched successfully"));
    } catch (error) {
        console.log("user controller error", error);
        if(error.statusCode) {
            return res.status(error.statusCode).json(customErrorResponse(error));
        }
        return next (new InternalServerError(error.message));
    }
}