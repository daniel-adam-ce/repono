import { StatusCodes } from "http-status-codes"

export class ApiError extends Error {
    code: number;
    context: any;
    date: Date;
    
    constructor(message, httpStatusCode = StatusCodes.INTERNAL_SERVER_ERROR, context?, ...params) {
        super(...params);

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ApiError);
        }

        this.message = message;
        this.code = httpStatusCode;
        this.context = context;
        this.date = new Date();
    }
}