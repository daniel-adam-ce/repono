import { StatusCodes } from "http-status-codes";
import { NewRoom, Room, db } from "../../../db";
import * as Models from "../../../models";
import RoomService from "../../../services/RoomService";


const mockRooms: Room[] = [
    {
        created_at: null,
        created_by: 1,
        house_id: 1,
        room_id: 1,
        room_name: "test1"
    },
    {
        created_at: null,
        created_by: 1,
        house_id: 1,
        room_id: 2,
        room_name: "test2"
    }
]

describe("getAllRooms by houseId", () => {

    it("should return an array of rooms given a valid houseId", async () => {
        const houseId = "1";
        const spy = jest.spyOn(Models.RoomRepository, 'findAllByHouseId');
        spy.mockResolvedValue(mockRooms);
        await expect(RoomService.getAllRooms(houseId)).resolves.toEqual<Array<Room>>(mockRooms);
    })

    it("should return an error if no houseId is provided", async () => {
        const houseId = "";
        const spy = jest.spyOn(Models.RoomRepository, 'findAllByHouseId');
        spy.mockResolvedValue(mockRooms);
        await expect(RoomService.getAllRooms(houseId)).rejects.toMatchObject({code: StatusCodes.UNPROCESSABLE_ENTITY})
    })

    it("should return a 500 error if db fails", async () => {
        const houseId = "1";
        const spy = jest.spyOn(Models.RoomRepository, 'findAllByHouseId');
        // spy.mockImplementation(() => Promise.reject("test"))
        spy.mockRejectedValue(new Error("Something went wrong"));
        await expect(RoomService.getAllRooms(houseId)).rejects.toMatchObject({code: StatusCodes.INTERNAL_SERVER_ERROR})
    })
})

describe("getRoom by roomId", () => {

    it("should return room given a valid houseId", async () => {
        const roomId = "2";
        const spy = jest.spyOn(Models.RoomRepository, 'findById');
        spy.mockResolvedValue(mockRooms[1]);
        await expect(RoomService.getRoom(roomId)).resolves.toEqual<Room>(mockRooms[1]);
    })

    it("should return an error if no roomId is provided", async () => {
        const roomId = "";
        const spy = jest.spyOn(Models.RoomRepository, 'findById');
        spy.mockResolvedValue(mockRooms[1]);
        await expect(RoomService.getRoom(roomId)).rejects.toMatchObject({code: StatusCodes.UNPROCESSABLE_ENTITY})
    })

    it("should return a 404 if invalid roomId", async () => {
        const roomId = "3";
        const spy = jest.spyOn(Models.RoomRepository, 'findById');
        spy.mockResolvedValue(undefined);
        await expect(RoomService.getRoom(roomId)).rejects.toMatchObject({code: StatusCodes.NOT_FOUND})
    })

    it("should return a 500 error if db fails", async () => {
        const houseId = "1";
        const spy = jest.spyOn(Models.RoomRepository, 'findById');
        spy.mockRejectedValue(new Error("Something went wrong"));
        await expect(RoomService.getRoom(houseId)).rejects.toMatchObject({code: StatusCodes.INTERNAL_SERVER_ERROR})
    })
})

describe("createRoom", () => {
    it("should create a room give valid information", async () => {
        const room: NewRoom = {
            room_name: "test3"
        }
        const spy = jest.spyOn(Models.RoomRepository, "createOne");
        spy.mockResolvedValue(room as Room);
        await expect(RoomService.createRoom(room)).resolves.toEqual(room);
    })

    it("should return a 422 given invalid information", async () => {
        const room: NewRoom = {
            room_name: ""
        }
        const spy = jest.spyOn(Models.RoomRepository, "createOne");
        spy.mockResolvedValue(room as Room);
        await expect(RoomService.createRoom(room)).rejects.toMatchObject({code: StatusCodes.UNPROCESSABLE_ENTITY});
    })

    it("should return a 500 given db error", async () => {
        const room: NewRoom = {
            room_name: "test3"
        }
        const spy = jest.spyOn(Models.RoomRepository, "createOne");
        spy.mockRejectedValue(new Error("Something went wrong"));
        await expect(RoomService.createRoom(room)).rejects.toMatchObject({code: StatusCodes.INTERNAL_SERVER_ERROR});
    })
})

afterAll(() => {
    db.destroy();
})