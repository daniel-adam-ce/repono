import { ApiError } from "../error";
import { StatusCodes } from "http-status-codes";
import { Room, RoomUpdate, NewRoom } from "../db";
import { RoomRepository } from "../models";


class RoomService {
    async getAllRooms(): Promise<Room[]> {
        try {
            return await RoomRepository.findAll();
        } catch (error) {
            throw new ApiError("Could not fetch rooms.", {error});
        }
    }

    async getRoom(id: string): Promise<Room> {
        let user: Room;
        try {
            if (!id) throw new Error("ID is required.");
            user = await RoomRepository.findById(parseInt(id));
        } catch (error) {
            throw new ApiError("Error fetching room.", {error})
        }
        if (!user) throw new ApiError("Room not found.", {httpStatusCode: StatusCodes.NOT_FOUND});
        return user;
    }

    async createRoom(room: NewRoom): Promise<Room> {
        let newRoom: Room;
        try {
            if (!room.room_name) throw new Error("Room name is required.");
            newRoom = await RoomRepository.createOne(room);
        } catch (error) {
            throw new ApiError("Error creating room.", {error})
        }
        return newRoom;
    }
}

export default new RoomService;