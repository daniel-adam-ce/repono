import { Model } from ".";
import { House, HouseUpdate, NewHouse, TableType, Tables, db } from "../db";

const tableForClass: TableType = "house";

export interface HouseWithTotals {
    house_id: number;
    house_name: string;
    total_items: number;
    total_rooms: number;
}

class HouseModel implements Model<House, NewHouse, HouseUpdate> {
    public readonly table: typeof tableForClass;

    constructor() {
        this.table = "house";
    }

    // SELECT house_name, item_count.num_items as total_items, room_count.num_rooms as total_rooms FROM house
    // LEFT JOIN (
    //     SELECT COUNT(item.house_id) as num_items, house_id FROM item
    //     WHERE item.house_id = 3
    //     GROUP BY item.house_id
    // ) as item_count
    // ON item_count.house_id = house.house_id
    // LEFT JOIN (
    //     SELECT COUNT(room.house_id) as num_rooms, house_id FROM room
    //     WHERE room.house_id = 3
    //     GROUP BY room.house_id
    // ) as room_count
    // ON room_count.house_id = house.house_id
    // WHERE house.house_id = 3;
    async findById(id: number): Promise<HouseWithTotals> {
        return await db.selectFrom(this.table)
            .leftJoin(
                (eb) => eb
                    .selectFrom("item")
                    .select((eb) =>
                        [
                            eb.fn.count<number>("item.house_id").as("num_items"),
                            "item.house_id"
                        ]
                    )
                    .where("item.house_id", "=", id)
                    .groupBy("item.house_id")
                    .as("item_count")
                ,
                (join) => join.onRef("item_count.house_id", "=", "house.house_id")
            )
            .leftJoin(
                (eb) => eb
                    .selectFrom("room")
                    .select((eb) => 
                        [
                            eb.fn.count<number>("room.house_id").as("num_rooms"),
                            "room.house_id"
                        ]
                    )
                    .where("room.house_id", "=", id)
                    .groupBy("room.house_id")
                    .as("room_count")
                ,
                (join) => join.onRef("room_count.house_id", "=", "house.house_id")
            )
            .select([
                'house.house_id',
                'house.house_name',
                'item_count.num_items as total_items',
                'room_count.num_rooms as total_rooms',
                'house.house_owner'
            ])
            .where('house.house_id', '=', id)
            .executeTakeFirst()
    }

    async findByOwner(id: number): Promise<House> {
        return await db.selectFrom(this.table)
            .where("house_owner", "=", id)
            .selectAll()
            .executeTakeFirst()
    }

    async findAll() {
        return await db.selectFrom(this.table).selectAll().execute();
    }

    // SELECT house.house_id, house.house_name FROM house 
    // LEFT JOIN house_user ON house.house_id = house_user.house_id
    // WHERE house_user.user_id = 3  
    async findAllByUserId(id: number) {
        return await db.selectFrom(this.table)
            .leftJoin("house_user", "house_user.house_id", "house.house_id")
            .select([
                "house.house_id",
                "house.house_name"
            ])
            .where("house_user.user_id", "=", id)
            .execute();
    }

    async updateOne(id: number, updateWith: HouseUpdate) {
        return await db.updateTable(this.table).set(updateWith).where('house_id', '=', id).returningAll().executeTakeFirst()
    }

    async createOne(house: NewHouse) {
        return await db.insertInto(this.table)
            .values(house)
            .returningAll()
            .executeTakeFirstOrThrow();
    }

    async deleteOne(id: number) {
        return await db.deleteFrom(this.table).where('house_id', '=', id)
            .returningAll()
            .executeTakeFirst()
    }
}

export const HouseRepository = new HouseModel();
