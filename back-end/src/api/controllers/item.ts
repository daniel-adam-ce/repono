import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { AppUser } from "../../db";
import ItemService from "../../services/ItemService";

const getItems = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { houseId } = req.params;
        const data = houseId ? await ItemService.getAllItemsByHouseId(houseId) : await ItemService.getAllItems();
        return res.status(StatusCodes.OK).json(data)
    } catch (error) {
        return next(error);
    }
}

const getItem = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await ItemService.getItem(req.params.roomId);
        return res.status(StatusCodes.OK).json(data);
    } catch (error) {
        return next(error);
    }
}

const createItem = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user: AppUser = res.locals.user; 
        const data = await ItemService.createItem({...req.body.item, created_by: user.user_id, house_id: req.params.houseId, room_id: req.body.item?.room_id ?? req.params.roomId});
        return res.status(StatusCodes.CREATED).json(data);
    } catch (error) {
        return next(error);   
    }
}

export {
    getItems,
    getItem,
    createItem
}