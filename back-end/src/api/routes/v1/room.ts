import { Router } from "express";
import { validateToken } from "../../middleware";
import { createRoom, getRoom, getRooms } from "../../controllers";

const route = Router();

const rooms = (router: Router) => {
    router.use("/rooms", route);

    route.get("/", getRooms);
    route.get("/:id", validateToken(), getRoom);
    route.post("/", validateToken(), createRoom);
}

export default rooms;