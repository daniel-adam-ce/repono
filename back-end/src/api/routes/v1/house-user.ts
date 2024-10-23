import { Router } from "express";
import { validateToken } from "@/api/middleware";
import { createHouseUser, getHouseUsers } from "@/api/controllers";

export const houseUserRouter = Router({mergeParams: true});

const houseUsers = (router: Router) => {
    router.use("/users", houseUserRouter);

    houseUserRouter.get("/", validateToken(), getHouseUsers);
    houseUserRouter.get("/:userId", validateToken(), getHouseUsers);
    houseUserRouter.post("/", validateToken(), createHouseUser);
}

export default houseUsers;