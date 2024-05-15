import { StatusCodes } from "http-status-codes";
import { NewHouse, House, db } from "../../../db";
import * as Models from "../../../models";
import HouseService from "../../../services/HouseService";


const mockHouses: House[] = [
    {
        created_at: null,
        house_id: 1,
        house_owner: 1,
        house_name: "test1"
    },
    {
        created_at: null,
        house_id: 2,
        house_owner: 1,
        house_name: "test2"
    }
]

describe("getAllHouses by houseId", () => {

    it("should return an array of houses given a valid houseId", async () => {
        const houseId = "1";
        const spy = jest.spyOn(Models.HouseRepository, 'findAll');
        spy.mockResolvedValue(mockHouses);
        await expect(HouseService.getAllHouses()).resolves.toEqual<Array<House>>(mockHouses);
    })

    it("should return a 500 error if db fails", async () => {
        const houseId = "1";
        const spy = jest.spyOn(Models.HouseRepository, 'findAll');
        // spy.mockImplementation(() => Promise.reject("test"))
        spy.mockRejectedValue(new Error("Something went wrong"));
        await expect(HouseService.getAllHouses()).rejects.toMatchObject({code: StatusCodes.INTERNAL_SERVER_ERROR})
    })
})

describe("getHouse by houseId", () => {

    it("should return house given a valid houseId", async () => {
        const houseId = "2";
        const spy = jest.spyOn(Models.HouseRepository, 'findById');
        spy.mockResolvedValue(mockHouses[1]);
        await expect(HouseService.getHouse(houseId)).resolves.toEqual<House>(mockHouses[1]);
    })

    it("should return an error if no houseId is provided", async () => {
        const houseId = "";
        const spy = jest.spyOn(Models.HouseRepository, 'findById');
        spy.mockResolvedValue(mockHouses[1]);
        await expect(HouseService.getHouse(houseId)).rejects.toMatchObject({code: StatusCodes.UNPROCESSABLE_ENTITY})
    })

    it("should return a 404 if invalid houseId", async () => {
        const houseId = "3";
        const spy = jest.spyOn(Models.HouseRepository, 'findById');
        spy.mockResolvedValue(undefined);
        await expect(HouseService.getHouse(houseId)).rejects.toMatchObject({code: StatusCodes.NOT_FOUND})
    })

    it("should return a 500 error if db fails", async () => {
        const houseId = "1";
        const spy = jest.spyOn(Models.HouseRepository, 'findById');
        spy.mockRejectedValue(new Error("Something went wrong"));
        await expect(HouseService.getHouse(houseId)).rejects.toMatchObject({code: StatusCodes.INTERNAL_SERVER_ERROR})
    })
})

describe("createHouse", () => {
    const house: NewHouse = {
        house_name: "test3",
        house_owner: 1
    }
    it("should create a house give valid information", async () => {
        const spy = jest.spyOn(Models.HouseRepository, "createOne");
        spy.mockResolvedValue(house as House);
        await await expect(HouseService.createHouse(house)).resolves.toEqual(house);
    })

    it("should return a 422 given invalid house name", async () => {
        const badHouse: NewHouse = {
            house_name: "",
            house_owner: 1
        }
        const spy = jest.spyOn(Models.HouseRepository, "createOne");
        spy.mockResolvedValue(badHouse as House);
        await expect(HouseService.createHouse(badHouse)).rejects.toMatchObject({code: StatusCodes.UNPROCESSABLE_ENTITY});
    })

    it("should return a 500 given invalid house owner", async () => {
        const badHouse: NewHouse = {
            house_name: "test3",
            house_owner: null
        }
        const spy = jest.spyOn(Models.HouseRepository, "createOne");
        spy.mockResolvedValue(badHouse as House);
        await expect(HouseService.createHouse(badHouse)).rejects.toMatchObject({code: StatusCodes.INTERNAL_SERVER_ERROR});
    })

    it("should return a 500 given db error", async () => {
        const spy = jest.spyOn(Models.HouseRepository, "createOne");
        spy.mockRejectedValue(new Error("Something went wrong"));
        await expect(HouseService.createHouse(house)).rejects.toMatchObject({code: StatusCodes.INTERNAL_SERVER_ERROR});
    })
})

afterAll(() => {
    db.destroy();
})