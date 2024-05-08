import { Insertable, Selectable, Updateable } from "kysely";
import { Room as RoomGen } from "kysely-codegen";

export type Room = Selectable<RoomGen>;
export type NewRoom = Insertable<RoomGen>;
export type RoomUpdate = Updateable<RoomGen>;