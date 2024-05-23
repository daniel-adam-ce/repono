import { BodyEndpoint, BodylessEndpoint, bodyEndpoint, bodyEndpointPost, bodylessEndpoint } from "../utils";
import { ItemEndpoints, items } from "./item";
import { RoomEndpoints, rooms } from "./room";


class HouseEndpoints {
    readonly baseUrl: string
    fetchAll: BodylessEndpoint<Array<any>>
    fetch: BodylessEndpoint<any, {houses: string | undefined}>
    create: BodyEndpoint<any, {house: any}>
    update: BodyEndpoint<any, {house: any}>
    rooms: typeof rooms
    items: typeof items

    constructor(url: string) {
        // super(url);
        this.baseUrl = url;
        this.fetchAll = bodylessEndpoint(url);
        this.fetch = bodylessEndpoint(url);
        this.create = bodyEndpoint(url);
        this.update = bodyEndpointPost(url);
        this.rooms = new RoomEndpoints(`${url}/rooms`);
        this.items = new ItemEndpoints(`${url}/items`);
    }
}

export const houses = new HouseEndpoints("/houses");