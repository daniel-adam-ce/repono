import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Credentials } from "google-auth-library";
import { SessionService } from "../../services";

const googleOAuth = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        
        const authUrl = SessionService.getGoogleOAuthURL();
        res.header("Location", authUrl);
        res.sendStatus(StatusCodes.MOVED_TEMPORARILY);
    } catch (error) {
        return next(error);
    }
}

const establishSession = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token: Credentials = await SessionService.GoogleOAuthCallback(req.query?.code as string);
        const domain = process.env.DOMAIN;
        res.header("Location", `${process.env.APP_URL}`);
        res.cookie(
            "token",
            token, 
            {
                maxAge: 1 * 60 * 60 * 1000,
                domain: domain,
                secure: domain !== "localhost",
                sameSite: "lax"
            }
        )
        res.sendStatus(StatusCodes.MOVED_PERMANENTLY)
    } catch (error) {
        return next(error);
    }
}

const checkSession = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const user = res.locals.user;

        return res.status(StatusCodes.OK).json({user});
    } catch (error) {
        return next(error);
    }
}

export {
    googleOAuth,
    establishSession,
    checkSession
}
