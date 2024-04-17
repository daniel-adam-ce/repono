import { ErrorRequestHandler } from "express";
import { StatusCodes } from "http-status-codes";

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
    console.error(err);
    const jsonErr = {
        code: err.code, 
        date: err.date,
        message: err.message
    }
    return res.status(err.code || StatusCodes.INTERNAL_SERVER_ERROR).json(jsonErr);
} 