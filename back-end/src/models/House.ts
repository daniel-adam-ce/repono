import { Model } from ".";
import { House, HouseUpdate, NewHouse, TableType, Tables, db } from "../db";

const tableForClass: TableType = "house";

class HouseModel implements Model<House, NewHouse, HouseUpdate> {
    public readonly table: typeof tableForClass;

    constructor() {
        this.table = "house";
    }

    async findById(id: number) {
        return await db.selectFrom(this.table)
          .where('house_id', '=', id)
          .selectAll()
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

    async updateOne(id: number, updateWith: HouseUpdate){
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
