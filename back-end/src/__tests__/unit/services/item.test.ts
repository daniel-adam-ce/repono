import { StatusCodes } from "http-status-codes";
import { Item, NewItem } from "../../../db";
import * as Models from "../../../models";
import ItemService from "../../../services/ItemService";

const mockItems: Item[] = [
    {
        created_at: null,
        created_by: 1,
        description: "description",
        house_id: 1,
        item_id: 1,
        item_name: "name",
        room_id: 1
    },
    {
        created_at: null,
        created_by: 1,
        description: "description",
        house_id: 1,
        item_id: 2,
        item_name: "name",
        room_id: 1
    }
]

const findAllSpy = jest.spyOn(Models.ItemRepository, 'findAll');
const finddByIdSpy = jest.spyOn(Models.ItemRepository, 'findById');
const createOneSpy = jest.spyOn(Models.ItemRepository, "createOne");

describe("get all items", () => {
    it("should return all items", async () => {
        // const spy = jest.spyOn(Models.ItemRepository, 'findAll');
        findAllSpy.mockResolvedValue(mockItems);
        await expect(ItemService.getAllItems()).resolves.toEqual<Array<Item>>(mockItems);
    });

    
    it("should return a 500 given a db error", async () => {
        // const spy = jest.spyOn(Models.ItemRepository, 'findAll');
        findAllSpy.mockRejectedValue(new Error("Something went wrong"));
        await expect(ItemService.getAllItems()).rejects.toMatchObject({code: StatusCodes.INTERNAL_SERVER_ERROR});
    });
})

describe("get Item", () => {
    it("should return an item given a valid id", async () => {
        finddByIdSpy.mockResolvedValue(mockItems[0]);
        await expect(ItemService.getItem("1")).resolves.toEqual<Item>(mockItems[0]);
    });

    it("should return a 422 if no id", async () => {
        finddByIdSpy.mockResolvedValue(mockItems[0]);
        await expect(ItemService.getItem("")).rejects.toMatchObject({code: StatusCodes.UNPROCESSABLE_ENTITY});
    });

    it("should return a 404 if no item found", async () => {
        finddByIdSpy.mockResolvedValue(undefined);
        await expect(ItemService.getItem("1")).rejects.toMatchObject({code: StatusCodes.NOT_FOUND});
    })

    it("should return a 500 if db error", async () => {
        finddByIdSpy.mockRejectedValue(new Error("Something went wrong"));
        await expect(ItemService.getItem("5")).rejects.toMatchObject({code: StatusCodes.INTERNAL_SERVER_ERROR});
    })
})

describe("create Item", () => {

    it("should create an item given valid data", async () => {
        createOneSpy.mockResolvedValue(mockItems[0]);
        await expect(ItemService.createItem(mockItems[0])).resolves.toEqual<Item>(mockItems[0]);
    });

    it("should return a 422 if no item name", async () => {
        const badItem = {
            item_name: ""
        }
        createOneSpy.mockResolvedValue(mockItems[0]);
        await expect(ItemService.createItem(badItem)).rejects.toMatchObject({code: StatusCodes.UNPROCESSABLE_ENTITY});
    });

    it("should return a 500 if db error", async () => {
        createOneSpy.mockRejectedValue(new Error("Something went wrong"));
        await expect(ItemService.createItem(mockItems[0])).rejects.toMatchObject({code: StatusCodes.INTERNAL_SERVER_ERROR});
    })
})