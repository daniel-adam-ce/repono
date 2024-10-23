import request from "supertest";
import { createApp } from "../../utils";
import { db } from "../../db";
import * as Models from "../../models";
import * as Services from "../../services";

const validateGoogleToken = jest.spyOn(Models.SessionRepository, "validateGoogleToken");
const validateSession = jest.spyOn(Services.SessionService, "validateSession");


const api = request(createApp())

console.error = jest.fn();
console.log = jest.fn();

describe("/GET items", () => {  
    it("returns status 200 and an array of items", async () => {
        validateSession.mockResolvedValue({email: "test@test.com", user_id: 1, created_at: new Date()});
        await api.get("/api/v1/items").expect(200);
    })
})

afterAll(() => {
    db.destroy();
})