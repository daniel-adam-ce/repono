import { ApiError } from "../error";
import {Credentials} from "google-auth-library";
import { SessionModel, User, UserModel } from "../models";
import { StatusCodes } from "http-status-codes";

class SessionService {

    getGoogleOAuthURL() {
        let authUrl: string;
        try {
            authUrl = SessionModel.generateAuthUrl();
        } catch (error) {
            console.log(error);
            throw new ApiError("Could not create OAuth link.");
        }
        return authUrl;
    }

    async GoogleOAuthCallback(code: string) {
        let token: Credentials;
        try {
            const googleToken = await SessionModel.getGoogleToken(code);
            const payload = await SessionModel.validateGoogleToken(googleToken.tokens);

            let user = await UserModel.findByEmail(payload.email);

            if (!user) {
                console.log("No user found, creating...");
                user = await UserModel.createUser(payload.email);
            }
            
            token = googleToken.tokens;
        } catch (error) {
            throw new ApiError("Could not handle OAuth callback.");
        }

        return token
    }

    async validateSession(token: Credentials) {
        let user: User;
        try {
            // TODO: refresh user session if expired
            const payload = await SessionModel.validateGoogleToken(token);

            user = await UserModel.findByEmail(payload.email);

        } catch (error) {
            throw new ApiError("Could not validate session.", StatusCodes.UNAUTHORIZED);
        }

        if (!user) throw new ApiError("User not found.", StatusCodes.UNAUTHORIZED);
        return user;
    }
}

export default new SessionService;