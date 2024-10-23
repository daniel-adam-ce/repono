import { ApiError } from "../error";
import { StatusCodes } from "http-status-codes";
import { Item, ItemUpdate, NewItem } from "@/db";
import { ItemRepository } from "@/models";


class ItemServiceClass {
    // this should be changed to onyl get items based on the hosue or houses that the item is in
    async getAllItems(userId: number) {
        try {
            return await ItemRepository.findAllByUserId(userId);
        } catch (error) {
            throw new ApiError("Could not fetch items.", { error });
        }
    }

    async getAllItemsByHouseId(houseId: string) {
        if (!houseId) throw new ApiError("ID is required.", { httpStatusCode: StatusCodes.BAD_REQUEST })
        try {
            return await ItemRepository.findAllByHouseId(parseInt(houseId));
        } catch (error) {
            throw new ApiError("Could not fetch items.", { error });
        }
    }

    async getItem(id: string): Promise<Item> {
        let item: Item;
        if (!id) throw new ApiError("ID is required.", { httpStatusCode: StatusCodes.BAD_REQUEST });
        try {
            item = await ItemRepository.findById(parseInt(id));
        } catch (error) {
            throw new ApiError("Error fetching item.", { error })
        }
        if (!item) throw new ApiError("Item not found.", { httpStatusCode: StatusCodes.NOT_FOUND });
        return item;
    }

    async createItem(item: NewItem): Promise<Item> {
        let newItem: Item;
        if (!item.item_name) throw new ApiError("Item name is required.", { httpStatusCode: StatusCodes.UNPROCESSABLE_ENTITY });
        try {
            newItem = await ItemRepository.createOne(item);
        } catch (error) {
            throw new ApiError("Error creating item.", { error })
        }
        return newItem;
    }

    async updateItem(id: string, item: ItemUpdate) {
        let updatedItem: Item;
        if (!item.item_name) throw new ApiError("Item name is required.", { httpStatusCode: StatusCodes.BAD_REQUEST });
        if (!id) throw new ApiError("ID is required.", { httpStatusCode: StatusCodes.BAD_REQUEST });
        try {
            updatedItem = await ItemRepository.updateOne(parseInt(id), item)
        } catch (error) {
            throw new ApiError("Error editing item.", { error });
        }
        return updatedItem;
    }

    async deleteItem(id: string): Promise<any> {
        if (!id) throw new ApiError("ID is required.", { httpStatusCode: StatusCodes.BAD_REQUEST });
        try {
            await ItemRepository.deleteOne(parseInt(id));
            return {};
        } catch (error) {
            throw new ApiError("Error deleting item.", { error });
        }
    }
}

export const ItemService = new ItemServiceClass;