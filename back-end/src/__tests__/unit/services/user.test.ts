import { StatusCodes } from "http-status-codes";
import { AppUser, db } from "../../../db";
import * as Models from "../../../models";
import { AppUserService } from "../../../services";

const mockUsers: AppUser[] = [
    {user_id: 1, email: "test@gmail.com", created_at: null},
    {user_id: 2, email: "test2@gmail.com", created_at: null},
    {user_id: 5, email: "danieladamce@gmail.com", created_at: null},
]

const findAllSpy = jest.spyOn(Models.AppUserRepository, 'findAll');
const findByIdSpy = jest.spyOn(Models.AppUserRepository, 'findById');

describe("get users", () => {


    it("should return an array of users", async () => {
        findAllSpy.mockResolvedValue(mockUsers);
        await expect(AppUserService.getAllUsers()).resolves.toEqual<Array<AppUser>>(mockUsers);
    })
})

describe("get user by id", () => {
    it("should return a user given a valid id", async () => {
        findByIdSpy.mockResolvedValue(mockUsers[0])
        await expect(AppUserService.getUser("1")).resolves.toEqual<AppUser>(mockUsers[0]);
    })

    it ("should throw an error given an invalid id", async () => {
        findByIdSpy.mockResolvedValue(undefined)
        await expect(AppUserService.getUser("10")).rejects.toMatchObject({code: StatusCodes.NOT_FOUND});
    })
})

afterAll(() => {
    db.destroy();
})