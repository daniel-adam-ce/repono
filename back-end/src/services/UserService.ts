import User from "../models/User";
import sql from "../db";
import { ApiError } from "../error";
import { StatusCodes } from "http-status-codes";


class UsersService {
    async getAllUsers(): Promise<User[]> {
        try {
            return await sql`SELECT * FROM users;`;
        } catch (error) {
            console.log(error);
            throw new ApiError("Could not fetch users.");
        }
    }

    async getUser(id: string): Promise<User> {
        let user: Array<User>;
        try {
            user = await sql`SELECT * FROM users WHERE id = ${id} LIMIT 1`;
        } catch (error) {
            console.log(error);
            throw new ApiError("Error fetching user.")
        }
        if (user.length === 0) throw new ApiError("User not found.", StatusCodes.NOT_FOUND);
        return user[0];
    }
}

export default new UsersService;