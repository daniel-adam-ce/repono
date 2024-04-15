
import express from "express"
import loaders from "../loaders";

export const createApp = () => {
    const app = express();

    loaders(app);

    return app;
}
