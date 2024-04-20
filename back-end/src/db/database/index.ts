import { UserTable } from "./app_user";
  
export enum Tables {
    app_users = "app_user",
}

export interface Database {
    app_user: UserTable
}

export * from "./app_user";