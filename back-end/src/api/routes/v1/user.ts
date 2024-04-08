import { Router } from "express";
import { getUser } from "../../controllers";

const route = Router();

const users = (router: Router) => {
    router.use("/users", route);

    route.get("/", getUser)
}

export default users;