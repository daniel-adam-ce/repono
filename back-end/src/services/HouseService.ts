import { ApiError } from "../error";
import { StatusCodes } from "http-status-codes";
import { House, HouseUpdate, HouseUser, NewHouse } from "@/db";
import { HouseRepository, HouseWithTotals, RoomRepository } from "@/models";
import { HouseUserRepository } from "@/models/HouseUser";


class HouseServiceClass {
    async getAllHouses(): Promise<House[]> {
        try {
            return await HouseRepository.findAll();
        } catch (error) {
            throw new ApiError("Could not fetch houses.", { error });
        }
    }

    async getAllHousesByUserId(userId: number) {
        try {
            return await HouseRepository.findAllByUserId(userId);
        } catch (error) {
            throw new ApiError("Could not fetch houses.", { error });
        }
    }

    async getHouse(id: string): Promise<HouseWithTotals> {
        let house: HouseWithTotals;
        if (!id) throw new ApiError("ID is required.", { httpStatusCode: StatusCodes.BAD_REQUEST });
        try {
            house = await HouseRepository.findById(parseInt(id));
        } catch (error) {
            throw new ApiError("Error fetching house.", { error });
        }
        if (!house) throw new ApiError("House not found.", { httpStatusCode: StatusCodes.NOT_FOUND });
        return house;
    }

    async createHouse(house: NewHouse): Promise<House> {
        let newHouse: House;
        if (!house.house_name) throw new ApiError("House name is required.", { httpStatusCode: StatusCodes.UNPROCESSABLE_ENTITY });
        if (!house.house_owner) throw new ApiError("Error creating house.", { httpStatusCode: StatusCodes.INTERNAL_SERVER_ERROR });
        try {
            newHouse = await HouseRepository.createOne(house);
            await HouseUserRepository.createOne({ user_id: newHouse.house_owner, house_id: newHouse.house_id });
        } catch (error) {
            throw new ApiError("Error creating house.", { error });
        }
        return newHouse;
    }

    async updateHouse(id: string, house: HouseUpdate) {
        let updatedHouse: House;
        if (!house.house_name) throw new ApiError("House name is required.", { httpStatusCode: StatusCodes.UNPROCESSABLE_ENTITY });
        if (!id) throw new ApiError("ID is required.", { httpStatusCode: StatusCodes.BAD_REQUEST });
        try {
            updatedHouse = await HouseRepository.updateOne(parseInt(id), house)
        } catch (error) {
            throw new ApiError("Error editing house.", { error });
        }
        return updatedHouse;
    }

    async deleteHouse(id: string): Promise<any> {
        if (!id) throw new ApiError("ID is required.", { httpStatusCode: StatusCodes.BAD_REQUEST });
        try {
            await RoomRepository.deleteOne(parseInt(id));
            return {};
        } catch (error) {
            throw new ApiError("Error deleting house.", { error });
        }
    }
}

export const HouseService = new HouseServiceClass;