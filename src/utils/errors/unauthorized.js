import { StatusCodes } from "http-status-codes";

import { BaseError } from "./baseError.js";

class UnAuthorized extends BaseError{

    constructor(details){
        super("UnAuthorized to access", StatusCodes.UNAUTHORIZED, "You are unauthorized for this operation", details);
    }

};


export default UnAuthorized;