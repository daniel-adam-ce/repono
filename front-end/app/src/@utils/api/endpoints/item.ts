import { BodyEndpoint, BodylessEndpoint, bodyEndpoint, bodylessEndpoint } from "../utils";

export class ItemEndpoints {
    readonly baseUrl: string
    fetchAll: BodylessEndpoint<Array<any>, {houses?: string}>
    fetch: BodylessEndpoint<any, {houses?: string | undefined, rooms?: string | undefined, items: string | undefined}>
    create: BodyEndpoint<any, {item: any}>

    constructor(url: string) {
        // super(url);
        this.baseUrl = url;
        this.fetchAll = bodylessEndpoint(url);
        this.fetch = bodylessEndpoint(url);
        this.create = bodyEndpoint(url);
    }

}

export const items = new ItemEndpoints("/items");