import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { HouseUserService } from "../../services";

const getHouseUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { houseId } = req.params;
        console.log(houseId)
        const data = await HouseUserService.getAllUsersByHouseId(houseId)
        return res.status(StatusCodes.OK).json(data)
    } catch (error) {
        return next(error);
    }
}

const getHouseUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await HouseUserService.getUser(req.params.id);
        return res.status(StatusCodes.OK).json(data)
    } catch (error) {
        return next(error);
    }
}


const createHouseUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { houseId } = req.params;
        const data = await HouseUserService.createUser({house_id: houseId, email: req.body.email})
        return res.status(StatusCodes.CREATED).json(data);
    } catch (error) {
        return next(error);
    }
}

export {
    getHouseUsers,
    getHouseUser,
    createHouseUser
}