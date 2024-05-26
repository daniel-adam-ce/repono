import { Router } from "express";
import { getUser, getUsers } from "../../controllers";
import { validateToken } from "../../middleware";

const route = Router();

const users = (router: Router) => {
    router.use("/users", route);

    route.get("/", getUsers);
    route.get("/:id", validateToken(), getUser);
}

export default users;