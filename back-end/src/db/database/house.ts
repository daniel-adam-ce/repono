import { Insertable, Selectable, Updateable } from "kysely";
import { House as HouseGen } from "kysely-codegen";

export type House = Selectable<HouseGen>;
export type NewHouse = Insertable<HouseGen>;
export type HouseUpdate = Updateable<HouseGen>;