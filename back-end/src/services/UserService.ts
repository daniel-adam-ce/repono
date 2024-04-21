import { ApiError } from "../error";
import { StatusCodes } from "http-status-codes";
import { User } from "../db";
import { UserRepository } from "../models";


class UsersService {
    async getAllUsers(): Promise<User[]> {
        try {
            return await UserRepository.findAll();
        } catch (error) {
            throw new ApiError("Could not fetch users.", {error});
        }
    }

    async getUser(id: string): Promise<User> {
        let user: User;
        try {
            if (!id) throw new Error("ID is required.");
            user = await UserRepository.findById(parseInt(id));
        } catch (error) {
            throw new ApiError("Error fetching user.", {error})
        }
        if (!user) throw new ApiError("User not found.", {httpStatusCode: StatusCodes.NOT_FOUND});
        return user;
    }
}

export default new UsersService;