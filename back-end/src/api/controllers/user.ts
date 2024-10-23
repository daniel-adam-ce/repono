import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { AppUserService } from "@/services";

const getUsers = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await AppUserService.getAllUsers();
        return res.status(StatusCodes.OK).json(data)
    } catch (error) {
        return next(error);
    }
}

const getUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await AppUserService.getUser(req.params.id);
        return res.status(StatusCodes.OK).json(data)
    } catch (error) {
        return next(error);
    }
}

export {
    getUsers,
    getUser
}