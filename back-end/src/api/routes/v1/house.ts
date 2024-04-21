import { Router } from "express";
import { validateToken } from "../../middleware";
import { createHouse, getHouse, getHouses } from "../../controllers/house";

const route = Router();

const users = (router: Router) => {
    router.use("/houses", route);

    route.get("/", getHouses);
    route.get("/:id", validateToken(), getHouse);
    route.post("/", validateToken(), createHouse);
}

export default users;