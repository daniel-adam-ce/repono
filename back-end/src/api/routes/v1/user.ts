import { Router } from "express";
import { getUser, getUsers } from "../../controllers";

const route = Router();

const users = (router: Router) => {
    router.use("/users", route);

    route.get("/", getUsers);
    route.get("/:id", getUser)
}

export default users;