import { Model } from ".";
import { Item, ItemUpdate, NewItem, TableType, Tables, db } from "../db";

// this is some jank but kysely needs the table to explicity be "item", and enums break on .where sometimes
const tableForModel: TableType = "item";

export interface ItemJoin extends Omit<Item, "house_id" | "room_id" | "created_by"> {
    room_name: string,
    house_name: string,
    email: never,
}

class ItemModel implements Model<Item, NewItem, ItemUpdate> {
    public readonly table: typeof tableForModel;

    constructor() {
        this.table = "item";
    }

    async findById(id: number) {
        return await db.selectFrom(this.table)
            .where('room_id', '=', id)
            .selectAll()
            .executeTakeFirst()
    }

    // async findAll() {
    //     return await db.selectFrom(this.table).selectAll().execute();
    // }

    async findAll() {
        return await db.selectFrom("item")
        .leftJoin("room", "room.room_id", "item.room_id")
        .leftJoin("house", "house.house_id", "item.house_id")
        .leftJoin("app_user", "app_user.user_id", "item.created_by")
        .select([
            "item_id",
            "item_name",
            "item.created_at",
            "description",
            "room_name",
            "house_name",
            "app_user.email"
        ]).execute();
    }

    async findAllByHouseId(houseId: number) {
        return await db.selectFrom(this.table)
            .where('item.house_id', '=', houseId)
            .leftJoin(Tables.room, "room.room_id", "item.room_id")
            .leftJoin(Tables.house, "house.house_id", "item.house_id")
            .leftJoin(Tables.app_users, "app_user.user_id", "item.created_by")
            .select([
                "item_id",
                "item_name",
                "item.created_at",
                "description",
                "room_name",
                "item.house_id",
                "house_name",
                "app_user.email"
            ])
            .execute();
    }

    async updateOne(id: number, updateWith: ItemUpdate) {
        return await db.updateTable(this.table).set(updateWith).where('room_id', '=', id).returningAll().executeTakeFirst()
    }

    async createOne(row: NewItem) {
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

export const ItemRepository = new ItemModel();