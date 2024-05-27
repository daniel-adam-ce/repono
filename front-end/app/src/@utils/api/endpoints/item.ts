import { BodyEndpoint, BodylessEndpoint, bodyEndpoint, bodyEndpointDelete, bodyEndpointPatch, bodylessEndpoint } from "../utils";

export class ItemEndpoints {
    readonly baseUrl: string
    fetchAll: BodylessEndpoint<Array<any>, {houses?: string}>
    fetch: BodylessEndpoint<any, {houses?: string | undefined, rooms?: string | undefined, items: string | undefined}>
    create: BodyEndpoint<any, {item: any}, {houses?: string | undefined}>
    update: BodyEndpoint<any, {item: any}, {houses?: string | undefined, rooms: string | undefined, items: string | undefined}>
    delete: BodyEndpoint<any, any, {houses?: string | undefined, rooms: string | undefined, items: string | undefined}>

    constructor(url: string) {
        // super(url);
        this.baseUrl = url;
        this.fetchAll = bodylessEndpoint(url);
        this.fetch = bodylessEndpoint(url);
        this.create = bodyEndpoint(url);
        this.update = bodyEndpointPatch(url);
        this.delete = bodyEndpointDelete(url)
    }

}

export const items = new ItemEndpoints("/items");