import { AppUser, db } from "../../db";
import UserService from "../../services/UserService";


const mockUsers = [
    {user_id: 1, email: "test@gmail.com", created_at: new Date()},
    {user_id: 2, email: "test2@gmail.com", created_at: new Date()},
    {user_id: 5, email: "danieladamce@gmail.com", created_at: new Date()},
]

describe("get users", () => {

    it("should return an array of users", async () => {
        expect(UserService.getAllUsers()).resolves.toStrictEqual<Array<AppUser>>(mockUsers);
    })
})

describe("get user by id", () => {
    it("should return a user given a valid id", async () => {
        expect(UserService.getUser("1")).resolves.toStrictEqual<AppUser>(mockUsers[0]);
    })

    it ("should throw an error given an invalid id", async () => {
        // const res = await UserService.getUser("10");
        expect(UserService.getUser("10")).rejects.toThrow();
    })
})

afterAll(() => {
    db.destroy();
})