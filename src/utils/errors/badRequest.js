import { StatusCodes } from "http-status-codes";

import { BaseError } from "./baseError.js";

class BadRequest extends BaseError{
    constructor(propertyName, details){
        super("BadRequest", StatusCodes.BAD_REQUEST, `Invalid ${propertyName} provided`, details);
    }
};

export default BadRequest;