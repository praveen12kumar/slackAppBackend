import { StatusCodes } from "http-status-codes";

import { BaseError } from "./baseError.js";

class NotFound extends BaseError{

    constructor(resourceName, resourcevalue){
     
        super("Not Found", StatusCodes.NOT_FOUND, `The requested ${resourceName} with value ${resourcevalue} not found`,
             {
                resourceName,
                resourcevalue
             });
    }
};

export default NotFound;