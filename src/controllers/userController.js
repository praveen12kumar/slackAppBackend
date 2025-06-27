import { StatusCodes } from "http-status-codes";

import { signInService,signUpService } from "../services/userService.js";
import { customErrorResponse, internalErrorResponse, successResponse } from "../utils/common/responseObject.js";
//import { InternalServerError } from "../utils/errors/internalServer.js";


export const signup = async(req, res)=>{
    // console.log("user controller", req.body);
    try {
        const user = await signUpService(req.body);
        return res.status(StatusCodes.CREATED).json(successResponse(user, "User created successfully"))
    } catch (error) {
        console.log("user controller error", error);
        if(error.statusCode){
            return res.status(error.statusCode).json(customErrorResponse(error));
        }
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(
            internalErrorResponse(error)
        )

    }
}


export const signIn = async(req, res, next)=>{
    try{
        
        const response = await signInService(req.body);

        return res.status(StatusCodes.OK).json(successResponse(response, "User signed in successfully"))

    }
    catch(error){
        console.log("user controller error", error);
        next(error);
    }
}