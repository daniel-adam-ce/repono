import { session } from "./session";
import { users } from "./users";
import { house } from "./house";

export class EndpointsClass {
    baseUrl: string;

    constructor(url: string) {
        this.baseUrl = url;
    }
}

export const Endpoints = {
    users,
    session
}
