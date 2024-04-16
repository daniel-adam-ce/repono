import { UserTable } from "./user";
  
export enum Tables {
    users = "users",
}

export interface Database {
    users: UserTable
}

export * from "./user";