import request from "supertest";
import { createApp } from "../../utils";
import { db } from "../../db";

const api = request(createApp())

describe("GET /users", () => {
    it("returns status 200 and an array of users", async () => {
        await api.get("/api/v1/users").expect(200);
    })
})

describe("GET /users/:id", () => {
    it("returns status 401 with no credentials", async () => {
        await api.get("/api/v1/users/1").expect(401);
    })

    // it("returns status 200 and a user given a valid id", async () => {
    //     await api.get("/api/v1/users/1").expect(200);
    // })
})

afterAll(() => {
    db.destroy();
})