import { Router } from "express";
import { validateToken } from "../../middleware";
import { createHouse, getHouse, getHouses, updateHouse } from "../../controllers/house";
import { roomRouter } from "./room";
import { itemRouter } from "./item";
import { houseUserRouter } from "./house-user";

const route = Router();

const houses = (router: Router) => {
    router.use("/houses", route);

    route.get("/", validateToken(), getHouses);
    route.get("/:houseId", validateToken(), getHouse);
    route.post("/", validateToken(), createHouse);
    route.patch("/:houseId", validateToken(), updateHouse);
    
    router.use("/houses/:houseId/rooms", roomRouter);
    router.use("/houses/:houseId/items", itemRouter);
    router.use("/houses/:houseId/users", houseUserRouter);
}

export default houses;