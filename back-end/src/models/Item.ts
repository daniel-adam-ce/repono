import { Model } from ".";
import { Item, ItemUpdate, NewItem, Tables, db } from "../db";

class ItemModel implements Model<Item, NewItem, ItemUpdate> {
    public readonly table: Tables.item;

    constructor() {
        this.table = Tables.item;
    }

    async findById(id: number) {
        return await db.selectFrom(this.table)
          .where('room_id', '=', id)
          .selectAll()
          .executeTakeFirst()
    }

    async findAll() {
        return await db.selectFrom(this.table).selectAll().execute();
    }

    async updateOne(id: number, updateWith: ItemUpdate){
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