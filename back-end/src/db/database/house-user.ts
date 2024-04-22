import { Insertable, Selectable, Updateable } from "kysely";
import { HouseUser as HouseUserGen } from "kysely-codegen";

export type HouseUser = Selectable<HouseUserGen>;
export type NewHouseUser = Insertable<HouseUserGen>;
export type HouseUserUpdate = Updateable<HouseUserGen>;