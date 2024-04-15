import expressLoader from "./expressLoader";
import  { Express } from "express";

export const loaders = (app: Express) => {
    expressLoader(app);
}

export default loaders;