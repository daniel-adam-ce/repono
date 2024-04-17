import { UserTable } from "./user";
  
export enum Tables {
    app_users = "app_user",
}

export interface Database {
    app_user: UserTable
}

export * from "./user";