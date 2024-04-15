import { ErrorRequestHandler } from "express";
import { StatusCodes } from "http-status-codes";

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
    console.error(err);
    return res.status(err.code || StatusCodes.INTERNAL_SERVER_ERROR).json(err);
} 