import { DB } from "kysely-codegen";

export enum Tables {
    app_users = "app_user",
    house = "house",
    house_user = "house_user"
}

export { type DB as Database }
export * from "./user";
export * from "./house";
export * from "./house-user";