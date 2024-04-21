import { Insertable, Selectable, Updateable } from "kysely";
import { AppUser as AppUserGen } from "kysely-codegen";

export type AppUser = Selectable<AppUserGen>;
export type NewAppUser = Insertable<AppUserGen>;
export type AppUserUpdate = Updateable<AppUserGen>;