import { Model } from ".";
import { HouseUser, HouseUserUpdate, NewHouseUser, TableType, Tables, db } from "@/db";

const tableForClass: TableType = "house_user";

class HouseUserModel implements Model<HouseUser, NewHouseUser, HouseUserUpdate> {
    public readonly table: typeof tableForClass;

    constructor() {
        this.table = "house_user";
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

    async findAllByHouseId(id: number) {
        return await db.selectFrom(this.table)
        .leftJoin("app_user", "house_user.user_id", "app_user.user_id")
        .select([
            "house_user.user_id",
            "app_user.email"
        ])
        .where("house_user.house_id", "=", id)
        .execute();
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
