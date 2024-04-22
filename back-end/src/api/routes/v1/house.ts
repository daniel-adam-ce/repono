import { Router } from "express";
import { validateToken } from "../../middleware";
import { createHouse, getHouse, getHouses } from "../../controllers/house";

const route = Router();

const houses = (router: Router) => {
    router.use("/houses", route);

    route.get("/", getHouses);
    route.get("/:id", validateToken(), getHouse);
    route.post("/", validateToken(), createHouse);
}

export default houses;