import { ApiError } from "../error";
import { StatusCodes } from "http-status-codes";
import { House, HouseUser, NewHouseUser } from "../db";
import { AppUserRepository, HouseRepository } from "../models";
import { HouseUserRepository } from "../models/HouseUser";


class HouserUserServiceClass {
    async getAllUsers(): Promise<HouseUser[]> {
        try {
            return await HouseUserRepository.findAll();
        } catch (error) {
            throw new ApiError("Could not fetch houses.", { error });
        }
    }

    async getAllUsersByHouseId(id: string) {
        if (!id) throw new ApiError("ID is required.", { httpStatusCode: StatusCodes.BAD_REQUEST });
        try {
            return await HouseUserRepository.findAllByHouseId(parseInt(id));
        } catch (error) {
            throw new ApiError("Could not fetch houses.", { error });
        }
    }

    async getUser(id: string): Promise<HouseUser> {
        let user: HouseUser;
        if (!id) throw new ApiError("ID is required.", { httpStatusCode: StatusCodes.BAD_REQUEST });
        try {
            user = await HouseUserRepository.findById(parseInt(id));
        } catch (error) {
            throw new ApiError("Error fetching house.", { error })
        }
        if (!user) throw new ApiError("House not found.", { httpStatusCode: StatusCodes.NOT_FOUND });
        return user;
    }

    async createUser(user: { email: string, house_id: string }): Promise<HouseUser> {
        let newHouseUser: HouseUser;
        if (!user.email) throw new ApiError("Email is required.", { httpStatusCode: StatusCodes.BAD_REQUEST });
        if (!user.house_id) throw new ApiError("Invalid request.", { httpStatusCode: StatusCodes.BAD_REQUEST });
        try {
            const appUser = await AppUserRepository.findByEmail(user.email);
            if (!appUser) throw new ApiError("No user exists with that email.", { httpStatusCode: StatusCodes.BAD_REQUEST })
            newHouseUser = await HouseUserRepository.createOne({user_id: appUser.user_id, house_id: parseInt(user.house_id)});

        } catch (error) {
            throw new ApiError("Error creating house.", { error, httpStatusCode: error instanceof ApiError ? error?.code : undefined })
        }
        return newHouseUser;
    }
}

export const HouseUserService = new HouserUserServiceClass;