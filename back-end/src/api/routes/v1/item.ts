import { Router } from "express";
import { validateToken } from "../../middleware";
import { createItem, getItem, getItems } from "../../controllers";

export const itemRouter = Router({mergeParams: true});

const items = (router: Router) => {
    router.use("/items", itemRouter);

    itemRouter.get("/", getItems);
    itemRouter.get("/:itemId", validateToken(), getItem);
    itemRouter.post("/", validateToken(), createItem);
}

export default items;