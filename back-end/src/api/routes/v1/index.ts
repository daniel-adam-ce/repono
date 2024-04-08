import { Router } from "express";
import users from "./user";
import health from "./health";

const v1 = Router();
users(v1);
health(v1);

export default v1;