import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import HouseService from "../../services/HouseService";
import { AppUser } from "../../db";

const getHouses = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        console.log('test')
        const data = await HouseService.getAllHouses();
        return res.status(StatusCodes.OK).json(data)
    } catch (error) {
        return next(error);
    }
}

const getHouse = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await HouseService.getHouse(req.params.id);
        return res.status(StatusCodes.OK).json(data);
    } catch (error) {
        return next(error);
    }
}

const createHouse = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user: AppUser = res.locals.user; 
        console.log(req.body);
        const data = await HouseService.createHouse({...req.body.house, house_owner: user.user_id});
        return res.status(StatusCodes.CREATED).json(data);
    } catch (error) {
        return next(error);   
    }
}

export {
    getHouses,
    getHouse,
    createHouse
}