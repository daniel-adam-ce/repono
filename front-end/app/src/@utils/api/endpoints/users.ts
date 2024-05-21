import { BodylessEndpoint, bodylessEndpoint } from "../utils";


class UserEndpoints {
    readonly baseUrl: string
    fetchAll: BodylessEndpoint<Array<any>>

    constructor(url: string) {
        // super(url);
        this.baseUrl = url;
        this.fetchAll = bodylessEndpoint(url);
    }
}

export const users = new UserEndpoints("/users");