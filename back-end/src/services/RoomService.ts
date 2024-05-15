import { ApiError } from "../error";
import { StatusCodes } from "http-status-codes";
import { Room, RoomUpdate, NewRoom } from "../db";
import { RoomRepository } from "../models";


class RoomService {
    async getAllRooms(houseId: string): Promise<Room[]> {
        if (!houseId) throw new ApiError("House is required.", { httpStatusCode: StatusCodes.UNPROCESSABLE_ENTITY })
        try {
            return await RoomRepository.findAllByHouseId(houseId);
        } catch (error) {
            throw new ApiError("Could not fetch rooms.", { error });
        }
    }

    async getRoom(roomId: string): Promise<Room> {
        let room: Room;
        if (!roomId) throw new ApiError("ID is required.", { httpStatusCode: StatusCodes.UNPROCESSABLE_ENTITY });
        try {
            room = await RoomRepository.findById(parseInt(roomId));
        } catch (error) {
            throw new ApiError("Error fetching room.", { error })
        }
        if (!room) throw new ApiError("Room not found.", { httpStatusCode: StatusCodes.NOT_FOUND });
        return room;
    }

    async createRoom(room: NewRoom): Promise<Room> {
        let newRoom: Room;
        if (!room.room_name) throw new ApiError("Room name is required.", { httpStatusCode: StatusCodes.UNPROCESSABLE_ENTITY });
        try {
            newRoom = await RoomRepository.createOne(room);
        } catch (error) {
            throw new ApiError("Error creating room.", { error })
        }
        return newRoom;
    }
}

export default new RoomService;