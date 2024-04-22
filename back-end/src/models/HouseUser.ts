import { Model } from ".";
import { HouseUser, HouseUserUpdate, NewHouseUser, Tables, db } from "../db";

class HouseUserModel implements Model<HouseUser, NewHouseUser, HouseUserUpdate> {
    public readonly table: Tables.house_user;

    constructor() {
        this.table = Tables.house_user;
    }

    async findById(id: number) {
        return await db.selectFrom(this.table)
          .where('house_id', '=', id)
          .selectAll()
          .executeTakeFirst()
    }

    async findAll() {
        return await db.selectFrom(this.table).selectAll().execute();
    }

    async updateOne(id: number, updateWith: HouseUserUpdate){
        return await db.updateTable(this.table).set(updateWith).where('house_id', '=', id).returningAll().executeTakeFirst()
    }
    
    async createOne(house: NewHouseUser) {
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

export const HouseUserRepository = new HouseUserModel();
