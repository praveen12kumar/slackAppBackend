import {StatusCodes} from "http-status-codes";

import {BaseError} from "./errors/baseError.js";

// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next){
    if(err instanceof BaseError){
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
            error: err.details,
            data:{},
        })
    }

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Something went wrong",
        error: err,
        data:{},
    });
}

export {errorHandler};