import { ApiError } from "../error";
import { StatusCodes } from "http-status-codes";
import { Room, RoomUpdate, NewRoom } from "../db";
import { RoomRepository } from "../models";


class RoomServiceClass {
    async getAllRooms(houseId: string) {
        if (!houseId) throw new ApiError("House is required.", { httpStatusCode: StatusCodes.BAD_REQUEST })
        try {
            return await RoomRepository.findAllByHouseId(parseInt(houseId));
        } catch (error) {
            throw new ApiError("Could not fetch rooms.", { error });
        }
    }

    async getRoom(roomId: string): Promise<Room> {
        let room: Room;
        if (!roomId) throw new ApiError("ID is required.", { httpStatusCode: StatusCodes.BAD_REQUEST });
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
        if (!room.room_name) throw new ApiError("Room name is required.", { httpStatusCode: StatusCodes.BAD_REQUEST });
        try {
            newRoom = await RoomRepository.createOne(room);
        } catch (error) {
            throw new ApiError("Error creating room.", { error })
        }
        return newRoom;
    }

    async updateRoom(id: string, room: RoomUpdate) {
        let updatedRoom: Room;
        if (!room.room_name) throw new ApiError("Room name is required.", { httpStatusCode: StatusCodes.BAD_REQUEST });
        if (!id) throw new ApiError("ID is required.", { httpStatusCode: StatusCodes.BAD_REQUEST });
        try {
            updatedRoom = await RoomRepository.updateOne(parseInt(id), room)
        } catch (error) {
            throw new ApiError("Error editing room.", { error });
        }
        return updatedRoom;
    }

    async deleteRoom(id: string): Promise<any> {
        if (!id) throw new ApiError("ID is required.", { httpStatusCode: StatusCodes.BAD_REQUEST });
        try {
            await RoomRepository.deleteOne(parseInt(id));
            return {};
        } catch (error) {
            throw new ApiError("Error deleting room.", { error });
        }
    }
}

export const RoomService = new RoomServiceClass;