import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import UsersService from "../../services/UserService";

const getUser = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await UsersService.getAllUsers();
        return res.status(StatusCodes.OK).json({message: users})
    } catch (error) {
        // console.log(error);
        return next(error);
    }
}

export {
    getUser
}