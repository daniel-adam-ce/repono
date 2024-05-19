import { ApiError } from "../error";
import { StatusCodes } from "http-status-codes";
import { House, HouseUser, NewHouse } from "../db";
import { HouseRepository } from "../models";
import { HouseUserRepository } from "../models/HouseUser";


class HouseService {
    async getAllHouses(): Promise<House[]> {
        try {
            return await HouseRepository.findAll();
        } catch (error) {
            throw new ApiError("Could not fetch houses.", { error });
        }
    }

    async getHouse(id: string): Promise<House> {
        let house: House;
        if (!id) throw new ApiError("ID is required.", { httpStatusCode: StatusCodes.BAD_REQUEST });
        try {
            house = await HouseRepository.findById(parseInt(id));
        } catch (error) {
            throw new ApiError("Error fetching house.", { error })
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
            throw new ApiError("Error creating house.", { error })
        }
        return newHouse;
    }
}

export default new HouseService;