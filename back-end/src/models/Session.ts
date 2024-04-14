import { Credentials, OAuth2Client } from "google-auth-library";
import { GetTokenResponse } from "google-auth-library/build/src/auth/oauth2client";


class SessionModelClass {
    private redirectURI: string;
    private googleClient: OAuth2Client;

    constructor() {
        this.redirectURI = process.env.API_URL + "/api/v1/session/callback";
        this.googleClient = new OAuth2Client(
            process.env.GOOGLE_CLIENT_ID,
            process.env.GOOGLE_CLIENT_SECRET,
            this.redirectURI
        )
    }

    getRedirectUri(): string {
        return this.redirectURI;
    }

    generateAuthUrl(): string {
        return this.googleClient.generateAuthUrl({
            "access_type": "offline",
            redirect_uri: this.redirectURI,
            prompt: "consent",
            scope: "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid"
        })
    }

    async getGoogleToken(code: string): Promise<GetTokenResponse> {
        if (!code) throw new Error("Invalid code.");
        
        return await this.googleClient.getToken({
            code: code,
        });
    }

    async validateGoogleToken(token: Credentials) {
        
        if (!token) throw new Error("Invalid token.");

        const ticket = await this.googleClient.verifyIdToken({
            idToken: token?.id_token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        return ticket.getPayload();
    }
}

export const SessionModel = new SessionModelClass();