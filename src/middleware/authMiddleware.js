
import jwt from "jsonwebtoken";

import logger from "../config/logger.config.js";
import { JWT_SECRET } from "../config/serverConfig.js";
import userRepository from "../repository/userRepository.js";
import { InternalServerError, UnAuthorized } from "../utils/errors/index.js";


export const isAuthenticated = async(req, res, next)=>{
    try {
        const token = req.headers['x-access-token'];

    if(!token){
        return next(new UnAuthorized('No auth token provided'));
    }

    const response = jwt.verify(token, JWT_SECRET);
    if(!response){
        return next( new UnAuthorized('Invalid auth token provided'));
    }

    const user = await userRepository.getById(response._id);
    if(!user){
        return next(new UnAuthorized('User not found with auth token provided'));
    }
    req.user = user.id;
    next();

    } catch (error) {
        logger.error("auth middleware error", error);
        if(error.name === 'JsonWebTokenError'){
            return next (new UnAuthorized('Invalid auth token provided'));
        }

        return next (new InternalServerError(error.message));
    }
}