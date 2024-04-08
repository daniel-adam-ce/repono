import User from "../models/User";
import sql from "../db";
import { ApiError } from "../error";


class UsersService {
    async getAllUsers(): Promise<User[]> {
        try {
            return await sql`SELECT * FROM users;`;
        } catch (error) {
            console.log(error);
            throw new ApiError("Could not fetch users.");
        }
    }
}

export default new UsersService;