import { ApiError } from "../error";
import {Credentials} from "google-auth-library";
import { SessionRepository, AppUserRepository } from "@/models";
import { StatusCodes } from "http-status-codes";
import { AppUser } from "@/db";

class SessionServiceClass {

    getGoogleOAuthURL() {
        let authUrl: string;
        try {
            authUrl = SessionRepository.generateAuthUrl();
        } catch (error) {
            console.log(error);
            throw new ApiError("Could not create OAuth link.");
        }
        return authUrl;
    }

    async GoogleOAuthCallback(code: string) {
        let token: Credentials;
        try {
            const googleToken = await SessionRepository.getGoogleToken(code);
            const payload = await SessionRepository.validateGoogleToken(googleToken.tokens);

            let user = await AppUserRepository.findByEmail(payload.email);

            if (!user) {
                console.log("No user found, creating...");
                user = await AppUserRepository.createOne({email: payload.email});
            }
            
            token = googleToken.tokens;
        } catch (error) {
            throw new ApiError("Could not handle OAuth callback.", {error});
        }

        return token
    }

    async validateSession(token: Credentials) {
        let user: AppUser;
        try {
            // TODO: refresh user session if expired
            const payload = await SessionRepository.validateGoogleToken(token);

            user = await AppUserRepository.findByEmail(payload.email);

        } catch (error) {
            throw new ApiError("Could not validate session.", {error, httpStatusCode: StatusCodes.UNAUTHORIZED});
        }

        if (!user) throw new ApiError("User not found.", {httpStatusCode: StatusCodes.UNAUTHORIZED});
        return user;
    }
}

export const SessionService = new SessionServiceClass;