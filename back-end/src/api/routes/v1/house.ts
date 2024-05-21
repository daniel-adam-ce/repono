import { Router } from "express";
import { validateToken } from "../../middleware";
import { createHouse, getHouse, getHouses, updateHouse } from "../../controllers/house";
import { roomRouter } from "./room";
import { itemRouter } from "./item";

const route = Router();

const houses = (router: Router) => {
    router.use("/houses", route);

    route.get("/", getHouses);
    route.get("/:houseId", validateToken(), getHouse);
    route.post("/", validateToken(), createHouse);
    route.patch("/:houseId", validateToken(), updateHouse);
    
    router.use("/houses/:houseId/rooms", roomRouter);
    router.use("/houses/:houseId/items", itemRouter);
}

export default houses;