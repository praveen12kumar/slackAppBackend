import { StatusCodes } from "http-status-codes";

import { getMessageService } from "../services/messageService.js";
import { customErrorResponse, successResponse  } from "../utils/common/responseObject.js";
import { InternalServerError } from "../utils/errors/index.js";

export const getMessagesController = async(req, res, next)=>{
    try {
        const response = await getMessageService({
            channelId: req.params.channelId,
        },  req.query.page || 1, 
            req.query.limit || 20,
            req.user
        );

        return res.status(StatusCodes.OK).json(successResponse(response, "Messages fetched successfully"));
    } catch (error) {
        if(error.statusCode) {
            return res.status(error.statusCode).json(customErrorResponse(error));
        }
        return next (new InternalServerError(error.message));
    }   
}