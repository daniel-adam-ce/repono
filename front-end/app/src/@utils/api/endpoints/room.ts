import { BodyEndpoint, BodylessEndpoint, bodyEndpoint, bodylessEndpoint } from "../utils";
import { ItemEndpoints, items } from "./item";


export class RoomEndpoints {
    readonly baseUrl: string
    fetchAll: BodylessEndpoint<Array<any>, {houses?: string}>
    fetch: BodylessEndpoint<any, {houses?: string | undefined, rooms: string | undefined}>
    create: BodyEndpoint<any, {room: any}>
    items: typeof items

    constructor(url: string) {
        // super(url);
        this.baseUrl = url;
        this.fetchAll = bodylessEndpoint(url);
        this.fetch = bodylessEndpoint(url);
        this.create = bodyEndpoint(url);
        this.items = new ItemEndpoints(`${url}/items`);
    }

}

export const rooms = new RoomEndpoints("/rooms");