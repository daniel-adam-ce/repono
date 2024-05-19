import { Model } from ".";
import { Room, RoomUpdate, NewRoom, Tables, db, TableType } from "../db";

const tableForClass: TableType = "room";

class RoomModel implements Model<Room, NewRoom, RoomUpdate> {
    public readonly table: typeof tableForClass;

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
        return await db.selectFrom(this.table).selectAll().execute();
    }

    async findAllByHouseId(houseId: number) {
        return await db.selectFrom(this.table)
        .selectAll()
        .where("house_id", '=', houseId)
        .execute();
    }

    async updateOne(id: number, updateWith: RoomUpdate){
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
