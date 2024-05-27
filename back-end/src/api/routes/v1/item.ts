import { Router } from "express";
import { validateToken } from "../../middleware";
import { createItem, deleteItem, getItem, getItems, updateItem } from "../../controllers";

export const itemRouter = Router({mergeParams: true});

const items = (router: Router) => {
    router.use("/items", itemRouter);

    itemRouter.get("/", validateToken(), getItems);
    itemRouter.get("/:itemId", validateToken(), getItem);
    itemRouter.post("/", validateToken(), createItem);
    itemRouter.patch("/:itemId", validateToken(), updateItem);
    itemRouter.delete("/:itemId", validateToken(), deleteItem);
}

export default items;