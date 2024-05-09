import { Router } from "express";
import { validateToken } from "../../middleware";
import { createRoom, getRoom, getRooms } from "../../controllers";

export const roomRouter = Router({mergeParams: true});

const rooms = (router: Router) => {
    router.use("/rooms", roomRouter);

    roomRouter.get("/", getRooms);
    roomRouter.get("/:roomId", validateToken(), getRoom);
    roomRouter.post("/", validateToken(), createRoom);
}

export default rooms;