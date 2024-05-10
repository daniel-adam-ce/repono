import { Router } from "express";
import { validateToken } from "../../middleware";
import { createHouse, getHouse, getHouses } from "../../controllers/house";
import { roomRouter } from "./room";

const route = Router();

const houses = (router: Router) => {
    router.use("/houses", route);

    route.get("/", getHouses);
    route.get("/:houseId", validateToken(), getHouse);
    route.post("/", validateToken(), createHouse);
    
    router.use("/houses/:houseId/rooms", roomRouter);
}

export default houses;