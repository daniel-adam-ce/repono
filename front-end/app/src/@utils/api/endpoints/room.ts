import { BodyEndpoint, BodylessEndpoint, bodyEndpoint, bodylessEndpoint } from "../utils";


class RoomEndpoints {
    readonly baseUrl: string
    fetchAll: BodylessEndpoint<Array<any>>
    fetch: BodylessEndpoint<any, string>
    create: BodyEndpoint<any, {room: any}>

    constructor(url: string) {
        // super(url);
        this.baseUrl = url;
        this.fetchAll = bodylessEndpoint(url);
        this.fetch = bodylessEndpoint(url);
        this.create = bodyEndpoint(url);
    }
}

export const room = new RoomEndpoints("/rooms");