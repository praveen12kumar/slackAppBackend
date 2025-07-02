import { StatusCodes } from "http-status-codes";

import { s3 } from "../config/aws-config.js";
import { AWS_BUCKET_NAME } from "../config/serverConfig.js";
import { getMessageService } from "../services/messageService.js";
import { customErrorResponse, successResponse  } from "../utils/common/responseObject.js";
import { InternalServerError } from "../utils/errors/index.js";

export const getMessagesController = async(req, res, next)=>{
    console.log("message controller", req.params.channelId);
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

export const getPresignedUrlFromAWS = async(req, res, next)=>{
    try {
        const url = await s3.getSignedUrlPromise('putObject', {
            Bucket: AWS_BUCKET_NAME,
            Key: `${Date.now()}`,
            Expires: 60,
        });

        return res.status(StatusCodes.OK).json(successResponse(url, "Presigned url fetched successfully"));
        
    } catch (error) {
        console.log("error in presigned url from aws", error);
        if(error.statusCode) {
            return res.status(error.statusCode)
                    .json(customErrorResponse(error));
        }
        return next (new InternalServerError(error.message));
    }
}
