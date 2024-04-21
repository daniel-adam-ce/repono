import { User, db } from "../../db";
import UserService from "../../services/UserService";


const mockUsers = [
    {user_id: 1, email: "test@gmail.com"},
    {user_id: 2, email: "test2@gmail.com"},
    {user_id: 5, email: "danieladamce@gmail.com"},
]

describe("get users", () => {

    it("should return an array of users", async () => {
        expect(UserService.getAllUsers()).resolves.toStrictEqual<Array<User>>(mockUsers);
    })
})

describe("get user by id", () => {
    it("should return a user given a valid id", async () => {
        expect(UserService.getUser("1")).resolves.toStrictEqual<User>(mockUsers[0]);
    })

    it ("should throw an error given an invalid id", async () => {
        // const res = await UserService.getUser("10");
        expect(UserService.getUser("10")).rejects.toThrow();
    })
})

afterAll(() => {
    db.destroy();
})