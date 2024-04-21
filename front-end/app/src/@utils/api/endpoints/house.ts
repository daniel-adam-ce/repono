import { EndpointsClass } from ".";
import { BodylessEndpoint, bodylessEndpoint } from "../utils";


class HouseEndpoints {
    readonly baseUrl: string
    fetchAll: BodylessEndpoint<Array<any>>
    fetch: BodylessEndpoint<any, number>

    constructor(url: string) {
        // super(url);
        this.baseUrl = url;
        this.fetchAll = bodylessEndpoint(url);
        this.fetch = bodylessEndpoint(url);
    }
}

export const house = new HouseEndpoints("/users");