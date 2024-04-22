import { Model } from ".";
import { AppUser, AppUserUpdate, NewAppUser, Tables, db } from "../db";

class AppUserModel implements Model<AppUser, NewAppUser, AppUserUpdate> {
    table: Tables.app_users
    
    constructor() {
        this.table = Tables.app_users;
    }

    async findById(id: number): Promise<AppUser> {
        return await db.selectFrom(this.table)
          .where('user_id', '=', id)
          .selectAll()
          .executeTakeFirst()
    }

    async findByEmail(email: string): Promise<AppUser> {
        return await db.selectFrom(this.table)
            .where("email", "=", email)
            .selectAll()
            .executeTakeFirst()
    }

    async findAll(): Promise<Array<AppUser>> {
        return await db.selectFrom(this.table).selectAll().execute();
    }

    async updateOne(id: number, updateWith: AppUserUpdate) {
        return await db.updateTable(this.table).set(updateWith).where('user_id', '=', id).returningAll().executeTakeFirst();
    }
    
    async createOne(person: NewAppUser) {
        return await db.insertInto(this.table)
            .values(person)
            .returningAll()
            .executeTakeFirstOrThrow()
    }
    
    async deleteOne(id: number) {
        return await db.deleteFrom(this.table).where('user_id', '=', id)
            .returningAll()
            .executeTakeFirst()
    }
}

export const AppUserRepository = new AppUserModel();
