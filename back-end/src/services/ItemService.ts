import { ApiError } from "../error";
import { StatusCodes } from "http-status-codes";
import { Item, ItemUpdate, NewItem } from "../db";
import { ItemRepository } from "../models";


class ItemService {
    async getAllItems(): Promise<Item[]> {
        try {
            return await ItemRepository.findAll();
        } catch (error) {
            throw new ApiError("Could not fetch items.", {error});
        }
    }

    async getItem(id: string): Promise<Item> {
        let user: Item;
        try {
            if (!id) throw new Error("ID is required.");
            user = await ItemRepository.findById(parseInt(id));
        } catch (error) {
            throw new ApiError("Error fetching item.", {error})
        }
        if (!user) throw new ApiError("Item not found.", {httpStatusCode: StatusCodes.NOT_FOUND});
        return user;
    }

    async createItem(item: NewItem): Promise<Item> {
        let newItem: Item;
        try {
            if (!item.item_name) throw new Error("Item name is required.");
            newItem = await ItemRepository.createOne(item);
        } catch (error) {
            throw new ApiError("Error creating item.", {error})
        }
        return newItem;
    }
}

export default new ItemService;