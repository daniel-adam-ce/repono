import { StatusCodes } from "http-status-codes"

export interface ApiErrorOptions {
    httpStatusCode?: number,
    error?: Error | unknown,
}

export class ApiError extends Error {
    code: number;
    context: any;
    date: Date;
    error: Error | unknown;
    
    constructor(message: string, options?: ApiErrorOptions, ...params) {
        super(...params);

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ApiError);
        }

        this.message = message;
        this.code = options?.httpStatusCode ?? StatusCodes.INTERNAL_SERVER_ERROR;
        this.date = new Date();
        this.error = options?.error;
    }
}