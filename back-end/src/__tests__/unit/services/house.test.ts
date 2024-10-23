import { StatusCodes } from "http-status-codes";
import { NewHouse, House, db } from "@/db";
import * as Models from "@/models";
import { HouseService } from "@/services";


const mockHouses: any[] = [
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

const findAllSpy = jest.spyOn(Models.HouseRepository, 'findAll');
const findByIdSpy = jest.spyOn(Models.HouseRepository, 'findById');
const createOneSpy = jest.spyOn(Models.HouseRepository, 'createOne');

describe("getAllHouses by houseId", () => {

    it("should return an array of houses given a valid houseId", async () => {
        findAllSpy.mockResolvedValue(mockHouses);
        await expect(HouseService.getAllHouses()).resolves.toEqual<Array<House>>(mockHouses);
    })

    it("should return a 500 error if db fails", async () => {
        findAllSpy.mockRejectedValue(new Error("Something went wrong"));
        await expect(HouseService.getAllHouses()).rejects.toMatchObject({code: StatusCodes.INTERNAL_SERVER_ERROR})
    })
})

describe("getHouse by houseId", () => {

    it("should return house given a valid houseId", async () => {
        const houseId = "2";
        findByIdSpy.mockResolvedValue(mockHouses[1]);
        await expect(HouseService.getHouse(houseId)).resolves.toEqual<House>(mockHouses[1]);
    })

    it("should return an error if no houseId is provided", async () => {
        const houseId = "";
        findByIdSpy.mockResolvedValue(mockHouses[1]);
        await expect(HouseService.getHouse(houseId)).rejects.toMatchObject({code: StatusCodes.BAD_REQUEST})
    })

    it("should return a 404 if invalid houseId", async () => {
        const houseId = "3";
        findByIdSpy.mockResolvedValue(undefined);
        await expect(HouseService.getHouse(houseId)).rejects.toMatchObject({code: StatusCodes.NOT_FOUND})
    })

    it("should return a 500 error if db fails", async () => {
        const houseId = "1";
        findByIdSpy.mockRejectedValue(new Error("Something went wrong"));
        await expect(HouseService.getHouse(houseId)).rejects.toMatchObject({code: StatusCodes.INTERNAL_SERVER_ERROR})
    })
})

describe("createHouse", () => {
    const house: NewHouse = {
        house_name: "test3",
        house_owner: 1
    }
    it("should create a house give valid information", async () => {
        createOneSpy.mockResolvedValue(house as House);
        await expect(HouseService.createHouse(house)).resolves.toEqual(house);
    })

    it("should return a 422 given invalid house name", async () => {
        const badHouse: NewHouse = {
            house_name: "",
            house_owner: 1
        }
        createOneSpy.mockResolvedValue(badHouse as House);
        await expect(HouseService.createHouse(badHouse)).rejects.toMatchObject({code: StatusCodes.UNPROCESSABLE_ENTITY});
    })

    it("should return a 500 given invalid house owner", async () => {
        const badHouse: NewHouse = {
            house_name: "test3",
            house_owner: null
        }
        createOneSpy.mockResolvedValue(badHouse as House);
        await expect(HouseService.createHouse(badHouse)).rejects.toMatchObject({code: StatusCodes.INTERNAL_SERVER_ERROR});
    })

    it("should return a 500 given db error", async () => {
        createOneSpy.mockRejectedValue(new Error("Something went wrong"));
        await expect(HouseService.createHouse(house)).rejects.toMatchObject({code: StatusCodes.INTERNAL_SERVER_ERROR});
    })
})

afterAll(() => {
    db.destroy();
})