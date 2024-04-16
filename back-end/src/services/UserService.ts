import { ApiError } from "../error";
import { StatusCodes } from "http-status-codes";
import { User } from "../db";
import { UserRepository } from "../models";


class UsersService {
    async getAllUsers(): Promise<User[]> {
        try {
            console.log('adsfas');
            return await UserRepository.findAll();
        } catch (error) {
            console.log(error);
            throw new ApiError("Could not fetch users.");
        }
    }

    async getUser(id: string): Promise<User> {
        let user: User;
        try {
            user = await UserRepository.findById(parseInt(id));
        } catch (error) {
            throw new ApiError("Error fetching user.")
        }
        if (!user) throw new ApiError("User not found.", StatusCodes.NOT_FOUND);
        return user;
    }
}

export default new UsersService;