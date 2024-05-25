import { ApiError } from "../error";
import { StatusCodes } from "http-status-codes";
import { House, HouseUser, NewHouseUser } from "../db";
import { HouseRepository } from "../models";
import { HouseUserRepository } from "../models/HouseUser";


class HouserUserServiceClass {
    async getAllUsers(): Promise<HouseUser[]> {
        try {
            return await HouseUserRepository.findAll();
        } catch (error) {
            throw new ApiError("Could not fetch houses.", {error});
        }
    }

    async getAllUsersByHouseId(id: string) {
        if (!id) throw new ApiError("ID is required.", { httpStatusCode: StatusCodes.BAD_REQUEST });
        try {
            return await HouseUserRepository.findAllByHouseId(parseInt(id));
        } catch (error) {
            throw new ApiError("Could not fetch houses.", {error});
        }
    }

    async getUser(id: string): Promise<HouseUser> {
        let user: HouseUser;
        if (!id) throw new ApiError("ID is required.", { httpStatusCode: StatusCodes.BAD_REQUEST });
        try {
            user = await HouseUserRepository.findById(parseInt(id));
        } catch (error) {
            throw new ApiError("Error fetching house.", {error})
        }
        if (!user) throw new ApiError("House not found.", {httpStatusCode: StatusCodes.NOT_FOUND});
        return user;
    }

    async createUser(user: {email: string}): Promise<House> {
        let newUser: House;
        let newHouseUser: HouseUser;
        try {
            if (!user.email) throw new Error("Email is required.");
            // newUser = await HouseUserRepository.createOne(user);

        } catch (error) {
            throw new ApiError("Error creating house.", {error})
        }
        return newUser;
    }
}

export const HouseUserService = new HouserUserServiceClass;