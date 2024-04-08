import { ErrorRequestHandler } from "express";
import { StatusCodes } from "http-status-codes";

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
    res.status(err.httpStatusCode || StatusCodes.INTERNAL_SERVER_ERROR)
    return res.json(err);
} 