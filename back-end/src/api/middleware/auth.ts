import { NextFunction, Request, Response } from "express";
import { SessionService } from "@/services";

export const validateToken = () => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.cookies?.token;

            const user = await SessionService.validateSession(token);

            res.locals.user = user;

            return next();
        } catch (error) {
            next(error);
        }
    }
}