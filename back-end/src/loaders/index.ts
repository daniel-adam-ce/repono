import expressLoader from "./expressLoader";
import  { Express } from "express";

export const loaders = async (app: Express) => {
    expressLoader(app);
}

export default loaders;