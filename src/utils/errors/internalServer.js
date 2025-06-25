import { StatusCodes } from "http-status-codes";

import { BaseError } from "./baseError.js";

class InternalServerError extends BaseError{

    constructor(details){
        super("InternalServerError", StatusCodes.INTERNAL_SERVER_ERROR, `Something went wrong !!`, details);
    }
}

export default InternalServerError;