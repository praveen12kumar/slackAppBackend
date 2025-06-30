import { StatusCodes } from "http-status-codes";

import { signInService,signUpService, verifyTokenService } from "../services/userService.js";
import { customErrorResponse, successResponse } from "../utils/common/responseObject.js";
import { InternalServerError } from "../utils/errors/index.js";


export const signup = async(req, res, next)=>{
    // console.log("user controller", req.body);
    try {
        const user = await signUpService(req.body);
        //console.log("user", user);
        return res.status(StatusCodes.CREATED).json(successResponse(user, "User created successfully"))
    } catch (error) {
        console.log("user controller error", error);
        if(error.statusCode){
            return res.status(error.statusCode).json(customErrorResponse(error));
        }
        return next (new InternalServerError(error.message));

    }
}


export const signIn = async(req, res, next)=>{
    try{
        
        const response = await signInService(req.body);
        //console.log("response", response);
        return res.status(StatusCodes.OK).json(successResponse(response, "User signed in successfully"))

    }
    catch(error){
        console.log("user controller error", error);
        if(error.statusCode){
            return res.status(error.statusCode).json(customErrorResponse(error));
        }
        return next (new InternalServerError(error.message));
    }
}




export const verifyEmailController = async( req, res, next) => {
    try {
        const response = await verifyTokenService(req.params.token);
        return res.status(StatusCodes.OK).json(successResponse(response, "Email verified successfully"));

    } catch (error) {
        console.log("user controller error", error);
        if(error.statusCode){
            return res.status(error.statusCode).json(customErrorResponse(error));
        }
        return next (new InternalServerError(error.message));
    }
}