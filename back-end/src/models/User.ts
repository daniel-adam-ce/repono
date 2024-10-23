import { Model } from ".";
import { AppUser, AppUserUpdate, NewAppUser, TableType, Tables, db } from "@/db";

const tableForClass: TableType = "app_user";

class AppUserModel implements Model<AppUser, NewAppUser, AppUserUpdate> {
    public readonly table: typeof tableForClass
    
    constructor() {
        this.table = "app_user";
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
