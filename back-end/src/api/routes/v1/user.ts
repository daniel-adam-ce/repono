import { Router } from "express";
import { getUser, getUsers } from "@/api/controllers";
import { validateToken } from "@/api/middleware";

const route = Router();

const users = (router: Router) => {
    router.use("/users", route);

    route.get("/", getUsers);
    route.get("/:id", validateToken(), getUser);
}

export default users;