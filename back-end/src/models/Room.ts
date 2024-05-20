import { Model } from ".";
import { Room, RoomUpdate, NewRoom, Tables, db, TableType } from "../db";

const roomTable: TableType = "room";

class RoomModel implements Model<Room, NewRoom, RoomUpdate> {
    public readonly table: typeof roomTable;

    constructor() {
        this.table = "room";
    }

    async findById(id: number) {
        return await db.selectFrom(this.table)
            .where('room_id', '=', id)
            .selectAll()
            .executeTakeFirst()
    }

    async findAll() {
        return await db.selectFrom(this.table)
            .selectAll()
            .execute();
    }

    // SELECT room.room_name, app_user.email, house.house_name, count FROM room 
    // LEFT JOIN house ON house.house_id = room.house_id
    // LEFT JOIN app_user ON app_user.user_id = room.created_by
    // LEFT JOIN 
    // (
    //     SELECT COUNT(item.room_id) as count, room_id FROM item 
    //     WHERE item.house_id = 3 
    //     GROUP BY item.room_id
    // ) 
    // as item_count
    // ON item_count.room_id = room.room_id
    // WHERE room.house_id = 3; 
    async findAllByHouseId(houseId: number) {
        return await db.selectFrom(this.table)
            .leftJoin(
                (eb) => eb
                    .selectFrom("item")
                    .select((eb) =>
                        [
                            eb.fn.count<number>("item.room_id").as("count"),
                            'room_id'
                        ]
                    )
                    .where("item.house_id", "=", houseId)
                    .groupBy("item.room_id")
                    .as("item_count")
                ,
                (join) => join.onRef("item_count.room_id", "=", "room.room_id")
            )
            .leftJoin("house", "house.house_id", "room.house_id")
            .leftJoin("app_user", "app_user.user_id", "room.created_by")
            .select([
                "room.room_id",
                "room.room_name",
                "item_count.count",
                "app_user.email",
                "room.house_id",
            ])
            // // .selectAll()
            .where("room.house_id", '=', houseId)
            .execute();
    }

    async updateOne(id: number, updateWith: RoomUpdate) {
        return await db.updateTable(this.table).set(updateWith).where('room_id', '=', id).returningAll().executeTakeFirst()
    }

    async createOne(row: NewRoom) {
        return await db.insertInto(this.table)
            .values(row)
            .returningAll()
            .executeTakeFirstOrThrow();
    }

    async deleteOne(id: number) {
        return await db.deleteFrom(this.table).where('room_id', '=', id)
            .returningAll()
            .executeTakeFirst()
    }
}

export const RoomRepository = new RoomModel();
