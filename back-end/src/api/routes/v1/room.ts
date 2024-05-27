import { Router } from "express";
import { validateToken } from "../../middleware";
import { createRoom, deleteRoom, getRoom, getRooms, updateRoom } from "../../controllers";
import { itemRouter } from "./item";

export const roomRouter = Router({mergeParams: true});

const rooms = (router: Router) => {
    router.use("/rooms", roomRouter);

    roomRouter.get("/", getRooms);
    roomRouter.get("/:roomId", validateToken(), getRoom);
    roomRouter.post("/", validateToken(), createRoom);
    roomRouter.patch("/:roomId", validateToken(), updateRoom);
    roomRouter.delete("/:roomId", validateToken(), deleteRoom);

    router.use("/rooms/:roomId", itemRouter);
}

export default rooms;