import { BodyEndpoint, BodylessEndpoint, bodyEndpoint, bodylessEndpoint } from "../utils";
import { RoomEndpoints, rooms } from "./room";


class HouseEndpoints {
    readonly baseUrl: string
    fetchAll: BodylessEndpoint<Array<any>>
    fetch: BodylessEndpoint<any, {houses: string | undefined}>
    create: BodyEndpoint<any, {houses: any}>
    rooms: typeof rooms

    constructor(url: string) {
        // super(url);
        this.baseUrl = url;
        this.fetchAll = bodylessEndpoint(url);
        this.fetch = bodylessEndpoint(url);
        this.create = bodyEndpoint(url);
        this.rooms = new RoomEndpoints("/houses/rooms")
    }
}

export const houses = new HouseEndpoints("/houses");