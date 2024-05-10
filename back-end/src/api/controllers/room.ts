import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { AppUser } from "../../db";
import RoomService from "../../services/RoomService";

const getRooms = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await RoomService.getAllRooms();
        return res.status(StatusCodes.OK).json(data)
    } catch (error) {
        return next(error);
    }
}

const getRoom = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await RoomService.getRoom(req.params.roomId);
        return res.status(StatusCodes.OK).json(data);
    } catch (error) {
        return next(error);
    }
}

const createRoom = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user: AppUser = res.locals.user; 
        const data = await RoomService.createRoom({...req.body.room, created_by: user.user_id, house_id: req.params.houseId});
        return res.status(StatusCodes.CREATED).json(data);
    } catch (error) {
        return next(error);   
    }
}

export {
    getRooms,
    getRoom,
    createRoom
}