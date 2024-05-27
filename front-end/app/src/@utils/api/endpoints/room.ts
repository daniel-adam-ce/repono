import { BodyEndpoint, BodylessEndpoint, bodyEndpoint, bodyEndpointDelete, bodyEndpointPatch, bodylessEndpoint } from "../utils";
import { ItemEndpoints, items } from "./item";


export class RoomEndpoints {
    readonly baseUrl: string
    fetchAll: BodylessEndpoint<Array<any>, {houses?: string}>
    fetch: BodylessEndpoint<any, {houses?: string | undefined, rooms: string | undefined}>
    create: BodyEndpoint<any, {room: any}, {houses?: string | undefined}>
    update: BodyEndpoint<any, {room: any}, {houses?: string | undefined, rooms: string | undefined}>
    delete: BodyEndpoint<any, any, {houses?: string |  undefined, rooms: string | undefined}>
    items: typeof items

    constructor(url: string) {
        // super(url);
        this.baseUrl = url;
        this.fetchAll = bodylessEndpoint(url);
        this.fetch = bodylessEndpoint(url);
        this.create = bodyEndpoint(url);
        this.update = bodyEndpointPatch(url);
        this.delete = bodyEndpointDelete(url);
        this.items = new ItemEndpoints(`${url}/items`);
    }

}

export const rooms = new RoomEndpoints("/rooms");