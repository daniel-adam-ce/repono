import { User, UserModel } from "../models/User";
import sql from "../db";
import { ApiError } from "../error";
import { StatusCodes } from "http-status-codes";


class UsersService {
    async getAllUsers(): Promise<User[]> {
        try {
            return await UserModel.findAll();
        } catch (error) {
            console.log(error);
            throw new ApiError("Could not fetch users.");
        }
    }

    async getUser(id: string): Promise<User> {
        let user: User;
        try {
            user = await UserModel.findById(id);
        } catch (error) {
            console.log(error);
            throw new ApiError("Error fetching user.")
        }
        if (!user) throw new ApiError("User not found.", StatusCodes.NOT_FOUND);
        return user;
    }
}

export default new UsersService;