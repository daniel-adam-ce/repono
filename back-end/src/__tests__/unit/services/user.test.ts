import { AppUser, db } from "../../../db";
import * as Models from "../../../models";
import UserService from "../../../services/UserService";

const mockUsers: AppUser[] = [
    {user_id: 1, email: "test@gmail.com", created_at: null},
    {user_id: 2, email: "test2@gmail.com", created_at: null},
    {user_id: 5, email: "danieladamce@gmail.com", created_at: null},
]

describe("get users", () => {


    it("should return an array of users", async () => {
        const spy = jest.spyOn(Models.AppUserRepository, 'findAll');
        spy.mockResolvedValue(mockUsers);
        await expect(UserService.getAllUsers()).resolves.toEqual<Array<AppUser>>(mockUsers);
    })
})

describe("get user by id", () => {
    it("should return a user given a valid id", async () => {
        await expect(UserService.getUser("1")).resolves.toEqual<AppUser>(mockUsers[0]);
    })

    it ("should throw an error given an invalid id", async () => {
        // const res = await UserService.getUser("10");
        await expect(UserService.getUser("10")).rejects.toThrow();
    })
})

afterAll(() => {
    db.destroy();
})