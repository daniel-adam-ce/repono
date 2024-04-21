import { DB } from "kysely-codegen";

export enum Tables {
    app_users = "app_user",
    house = "house"
}

export { type DB as Database }
export * from "./user";
export * from "./house";