import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { AppUser } from "@/db";
import { ItemService } from "@/services";

const getItems = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { houseId } = req.params;
        const user = res.locals.user;
        const data = houseId ? await ItemService.getAllItemsByHouseId(houseId) : await ItemService.getAllItems(user.user_id);
        return res.status(StatusCodes.OK).json(data)
    } catch (error) {
        return next(error);
    }
}

const getItem = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { itemId } = req.params;
        console.log(req.params);
        const data = await ItemService.getItem(itemId);
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

const updateItem = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { houseId, roomId, itemId } = req.params;
        const data = await ItemService.updateItem(itemId, req.body.item);
        return res.status(StatusCodes.OK).json(data);
    } catch (error) {
        return next(error);   
    }
}

const deleteItem = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { houseId, roomId, itemId } = req.params;
        const data = await ItemService.deleteItem(itemId);
        return res.status(StatusCodes.OK).json(data);
    } catch (error) {
        return next(error);   
    }
}

export {
    getItems,
    getItem,
    createItem,
    updateItem,
    deleteItem
}