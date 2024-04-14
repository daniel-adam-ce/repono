import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { UserModel } from "../../models";
import { OAuth2Client } from "google-auth-library";
import SessionService from "../../services/SessionService";

export const validateToken = () => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.cookies?.token;

            const user = await SessionService.validateSession(token);

            res.locals.user = user;

            return next()
        } catch (error) {
            console.log("Auth failed: ", error)
            return res.status(StatusCodes.UNAUTHORIZED).send()
        }
    }
}