import { Model } from ".";
import { Item, ItemUpdate, NewItem, TableType, Tables, db } from "@/db";

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
            .where('item_id', '=', id)
            .selectAll()
            .executeTakeFirst()
    }

    async findAll() {
        return await db.selectFrom(this.table).selectAll().execute();
    }

    // SELECT item.item_name, house.house_name, room.room_name, house.house_id, app_user.user_id, room.room_id, app_user.email, item.created_by
    // FROM item
    // INNER JOIN
    // (
    //     SELECT * FROM house_user
    //     WHERE house_user.user_id = 3
    // ) as house_user_temp ON house_user_temp.house_id = house_user_temp.house_id
    // INNER JOIN house on item.house_id = house.house_id
    // INNER JOIN room on item.room_id = room.room_id
    // INNER JOIN app_user on item.created_by = app_user.user_id
    // WHERE house_user_temp.house_id = house.house_id;
    async findAllByUserId(userId: number) {
        return await db.selectFrom("item")
            .innerJoin((eb) =>
                eb.selectFrom("house_user")
                    .selectAll()
                    .where("house_user.user_id", "=", userId)
                    .as("house_user_temp")
                ,
                (join) => join.onRef("house_user_temp.house_id", "=", "house_user_temp.house_id")
            )
            .innerJoin("house", "item.house_id", "house.house_id")
            .innerJoin("room", "item.room_id", "room.room_id")
            .innerJoin("app_user", "item.created_by", "app_user.user_id")
            .select([
                "item.item_id",
                "item.item_name",
                "item.description",
                "house.house_name",
                "room.room_name",
                "app_user.email",
            ])
            .whereRef("house_user_temp.house_id", "=", "house.house_id")
            .execute();
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
        return await db.updateTable(this.table).set(updateWith).where('item_id', '=', id).returningAll().executeTakeFirst()
    }

    async createOne(row: NewItem) {
        return await db.insertInto(this.table)
            .values(row)
            .returningAll()
            .executeTakeFirstOrThrow();
    }

    async deleteOne(id: number) {
        return await db.deleteFrom(this.table).where('item_id', '=', id)
            .returningAll()
            .executeTakeFirst()
    }
}

export const ItemRepository = new ItemModel();