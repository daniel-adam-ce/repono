import { BodylessEndpoint, bodylessEndpoint } from "../utils";

// functionally this relates to house_user, app_user is not user facing
export class UserEndpoints {
    readonly baseUrl: string
    fetchAll: BodylessEndpoint<Array<any>, {houses?: string | undefined}>

    constructor(url: string) {
        // super(url);
        this.baseUrl = url;
        this.fetchAll = bodylessEndpoint(url);
    }
}

export const users = new UserEndpoints("/users");