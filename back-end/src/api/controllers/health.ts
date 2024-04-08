import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

const healthCheck = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        return res.status(StatusCodes.OK).json({message: "API running."})
    } catch (error) {
        return next(error);
    }
}

export {
    healthCheck
}