import { session } from "./session";
import { users } from "./users";
import { house } from "./house";
import { room } from "./room";

export class EndpointsClass {
    baseUrl: string;

    constructor(url: string) {
        this.baseUrl = url;
    }
}

export const Endpoints = {
    users,
    session,
    house,
    room
}
