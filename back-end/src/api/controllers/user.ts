import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import UsersService from "../../services/UserService";

const getUsers = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await UsersService.getAllUsers();
        return res.status(StatusCodes.OK).json(data)
    } catch (error) {
        // console.log(error);
        return next(error);
    }
}

const getUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await UsersService.getUser(req.params.id);
        return res.status(StatusCodes.OK).json(data)
    } catch (error) {
        // console.log(error);
        return next(error);
    }
}

export {
    getUsers,
    getUser
}