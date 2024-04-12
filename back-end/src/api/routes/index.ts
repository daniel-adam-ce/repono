import { Router } from "express";
import v1 from "./v1";

export const routes = Router();
routes.use('/api/v1', v1);
