import { ApiError } from "../error";
import { StatusCodes } from "http-status-codes";
import { AppUser } from "../db";
import { AppUserRepository } from "../models";


class UsersServiceClass {
    async getAllUsers(): Promise<AppUser[]> {
        try {
            return await AppUserRepository.findAll();
        } catch (error) {
            throw new ApiError("Could not fetch users.", {error});
        }
    }

    async getUser(id: string): Promise<AppUser> {
        let user: AppUser;
        try {
            if (!id) throw new Error("ID is required.");
            user = await AppUserRepository.findById(parseInt(id));
        } catch (error) {
            throw new ApiError("Error fetching user.", {error})
        }
        if (!user) throw new ApiError("User not found.", {httpStatusCode: StatusCodes.NOT_FOUND});
        return user;
    }
}

export const AppUserService = new UsersServiceClass;