import { Router } from "express";
import users from "./user";
import health from "./health";
import session from "./sesson";
import houses from "./house";

const v1 = Router();

users(v1);
health(v1);
session(v1);
houses(v1);

export default v1;