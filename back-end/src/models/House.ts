import { House, HouseUpdate, NewHouse, Tables, db } from "../db";

class HouseModel {
    table: Tables.house;

    async findById(id: number): Promise<House> {
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

    async findAll(): Promise<Array<House>> {
        return await db.selectFrom(this.table).selectAll().execute();
    }

    async updateHouse(id: number, updateWith: HouseUpdate) {
        await db.updateTable(this.table).set(updateWith).where('house_id', '=', id).execute()
    }
    
    async createHouse(house: NewHouse) {
        return await db.insertInto(this.table)
            .values(house)
            .returningAll()
            .executeTakeFirstOrThrow()
    }
    
    async deleteHouse(id: number) {
        return await db.deleteFrom(this.table).where('house_id', '=', id)
            .returningAll()
            .executeTakeFirst()
    }
}

export const HouseRepository = new HouseModel();
