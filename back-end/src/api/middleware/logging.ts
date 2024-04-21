import { NextFunction, Request, Response } from "express";

export const logging = (req: Request, _res: Response, next: NextFunction) => {
    try {
        const Log = {
            date: new Date(),
            endpoint: req.url, 
            method: req.method,
            body: req.body,
            params: req.params,
            query: req.query
        }
        console.log(Log)

    } catch (error) {
        next(error);
    }
    next();
}