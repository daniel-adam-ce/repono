import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import HouseService from "../../services/HouseService";
import { AppUser } from "../../db";

const getHouses = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const user: AppUser = res.locals.user;
        const data = await HouseService.getAllHousesByUserId(user.user_id);
        return res.status(StatusCodes.OK).json(data)
    } catch (error) {
        return next(error);
    }
}

const getHouse = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await HouseService.getHouse(req.params.houseId);
        return res.status(StatusCodes.OK).json(data);
    } catch (error) {
        return next(error);
    }
}

const createHouse = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user: AppUser = res.locals.user; 
        const data = await HouseService.createHouse({...req.body.house, house_owner: user.user_id});
        return res.status(StatusCodes.CREATED).json(data);
    } catch (error) {
        return next(error);   
    }
}

const updateHouse = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { houseId } = req.params;
        const data = await HouseService.updateHouse(houseId, req.body.house);
        return res.status(StatusCodes.OK).json(data);
    } catch (error) {
        return next(error);   
    }
}

export {
    getHouses,
    getHouse,
    createHouse,
    updateHouse
}