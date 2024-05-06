import { EndpointsClass } from ".";
import { BodylessEndpoint, bodylessEndpoint } from "../utils";


class SessionEndpoints {
    baseUrl: string
    getSession: BodylessEndpoint<any>

    constructor(url: string) {
        // super(url);
        this.baseUrl = url;
        this.getSession = bodylessEndpoint(url);
    }
}

export const session = new SessionEndpoints("/session");