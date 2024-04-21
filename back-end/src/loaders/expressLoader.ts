import express from "express"
import { errorHandler, validateToken, routes, logging } from "../api";
import cookieParser from "cookie-parser"
import bodyParser from "body-parser";
import cors from "cors";
export const expressLoader = (app: express.Express) => {

    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    app.use(cors({
        origin: process.env.APP_URL,
        credentials: true,
    }));

    app.use( express.json() );
    app.use( express.urlencoded( { extended: true } ))
    app.use(cookieParser());

    app.use(logging);
    app.use(routes)

    app.use(errorHandler);
}


export default expressLoader;