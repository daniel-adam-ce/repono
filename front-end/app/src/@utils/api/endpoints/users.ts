import { EndpointsClass } from ".";
import { BodylessEndpoint, bodylessEndpoint } from "../utils";


class UserEndpoints {
    baseUrl: string
    view: BodylessEndpoint<Array<any>>

    constructor(url: string) {
        // super(url);
        this.baseUrl = url;
        this.view = bodylessEndpoint(url);
    }
}

export const users = new UserEndpoints("/users");