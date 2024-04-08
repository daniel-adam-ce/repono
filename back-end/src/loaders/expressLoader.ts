import express from "express"
import cors from "cors";
import { errorHandler, routes } from "../api";

export const expressLoader = (app: express.Express) => {

    app.use( cors() );
    app.use( express.json() );
    app.use( express.urlencoded( { extended: true } ))

    app.use(routes)

    app.use(errorHandler);
}


export default expressLoader;