import { BodyEndpoint, BodylessEndpoint, bodyEndpoint, bodylessEndpoint } from "../utils";


export class RoomEndpoints {
    readonly baseUrl: string
    fetchAll: BodylessEndpoint<Array<any>, {houses?: string}>
    fetch: BodylessEndpoint<any, {houses?: string | undefined, room: string | undefined}>
    create: BodyEndpoint<any, {room: any}>

    constructor(url: string) {
        // super(url);
        this.baseUrl = url;
        this.fetchAll = bodylessEndpoint(url);
        this.fetch = bodylessEndpoint(url);
        this.create = bodyEndpoint(url);
    }

}

export const rooms = new RoomEndpoints("/rooms");