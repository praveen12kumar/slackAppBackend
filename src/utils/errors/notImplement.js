import { StatusCodes } from "http-status-codes";

import { BaseError } from "./baseError.js";

class NotImplemented extends BaseError{

    constructor(methodName){
        super("NotImplemented", StatusCodes.NOT_IMPLEMENTED, `${methodName} not Implemented`, {});
    }
}

export default NotImplemented;
