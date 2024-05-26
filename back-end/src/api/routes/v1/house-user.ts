import { Router } from "express";
import { validateToken } from "../../middleware";
import { createHouseUser, getHouseUsers } from "../../controllers";

export const houseUserRouter = Router({mergeParams: true});

const houseUsers = (router: Router) => {
    router.use("/users", houseUserRouter);

    houseUserRouter.get("/", validateToken(), getHouseUsers);
    houseUserRouter.get("/:userId", validateToken(), getHouseUsers);
    houseUserRouter.post("/", validateToken(), createHouseUser);
}

export default houseUsers;