import { BodyEndpoint, BodylessEndpoint, bodyEndpoint, bodyEndpointDelete, bodyEndpointPatch, bodylessEndpoint } from "../utils";
import { ItemEndpoints, items } from "./item";
import { RoomEndpoints, rooms } from "./room";
import { UserEndpoints, users } from "./users";


class HouseEndpoints {
    readonly baseUrl: string
    fetchAll: BodylessEndpoint<Array<any>>
    fetch: BodylessEndpoint<any, {houses: string | undefined}>
    create: BodyEndpoint<any, {house: any}>
    update: BodyEndpoint<any, {house: any}>
    delete: BodyEndpoint<any, any, {houses: string | undefined}>
    rooms: typeof rooms
    items: typeof items
    users: typeof users

    constructor(url: string) {
        // super(url);
        this.baseUrl = url;
        this.fetchAll = bodylessEndpoint(url);
        this.fetch = bodylessEndpoint(url);
        this.create = bodyEndpoint(url);
        this.update = bodyEndpointPatch(url);
        this.delete = bodyEndpointDelete(url);
        this.rooms = new RoomEndpoints(`${url}/rooms`);
        this.items = new ItemEndpoints(`${url}/items`);
        this.users = new UserEndpoints(`${url}/users`);
    }
}

export const houses = new HouseEndpoints("/houses");