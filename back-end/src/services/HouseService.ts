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
            throw new ApiError("Could not fetch houses.", {error});
        }
    }

    async getHouse(id: string): Promise<House> {
        let user: House;
        try {
            if (!id) throw new Error("ID is required.");
            user = await HouseRepository.findById(parseInt(id));
        } catch (error) {
            throw new ApiError("Error fetching house.", {error})
        }
        if (!user) throw new ApiError("House not found.", {httpStatusCode: StatusCodes.NOT_FOUND});
        return user;
    }

    async createHouse(house: any): Promise<House> {
        let newHouse: House;
        let newHouseUser: HouseUser;
        try {
            console.log(house);
            if (!house.house_name) throw new Error("House name is required.");
            newHouse = await HouseRepository.createOne(house);
            newHouseUser = await HouseUserRepository.createOne({user_id: newHouse.house_owner, house_id: newHouse.house_id});
        } catch (error) {
            throw new ApiError("Error creating house.", {error})
        }
        return newHouse;
    }
}

export default new HouseService;