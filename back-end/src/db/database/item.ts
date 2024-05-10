import { Insertable, Selectable, Updateable } from "kysely";
import { Item as ItemGen } from "kysely-codegen";

export type Item = Selectable<ItemGen>;
export type NewItem = Insertable<ItemGen>;
export type ItemUpdate = Updateable<ItemGen>;