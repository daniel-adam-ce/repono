
import sql from "../db";
import { ApiError } from "../error";
import { StatusCodes } from "http-status-codes";
import {OAuth2Client} from "google-auth-library";
import UserService from "./UserService";
import { UserModel } from "../models";

class SessionService {
    async createSession(clientId: string) {
        try {
            const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
            
            const ticket = await client.verifyIdToken({idToken: clientId, audience: process.env.GOOGLE_CLIENT_ID})
            const payload = ticket.getPayload();
            if (payload.email_verified) {
                const userInDb = await UserModel.findByEmail(payload.email);
                if (!userInDb) {

                }
            }
        } catch (error) {
            console.log(error);
            throw new ApiError("Could not fetch users.");
        }
    }
}

export default new SessionService;