import { session } from "./session";
import { users } from "./users";
import { houses } from "./house";
import { rooms } from "./room";

export class EndpointsClass {
    baseUrl: string;

    constructor(url: string) {
        this.baseUrl = url;
    }
}

export const Endpoints = {
    users,
    session,
    houses,
    rooms
}
