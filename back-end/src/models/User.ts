import { AppUser, AppUserUpdate, NewAppUser, Tables, db } from "../db";

class AppUserModel {

    async findById(id: number): Promise<AppUser> {
        return await db.selectFrom(Tables.app_users)
          .where('user_id', '=', id)
          .selectAll()
          .executeTakeFirst()
    }

    async findByEmail(email: string): Promise<AppUser> {
        return await db.selectFrom(Tables.app_users)
            .where("email", "=", email)
            .selectAll()
            .executeTakeFirst()
    }

    async findAll(): Promise<Array<AppUser>> {
        return await db.selectFrom(Tables.app_users).selectAll().execute();
    }

    async updateAppUser(id: number, updateWith: AppUserUpdate) {
        await db.updateTable(Tables.app_users).set(updateWith).where('user_id', '=', id).execute()
    }
    
    async createAppUser(person: NewAppUser) {
        return await db.insertInto(Tables.app_users)
            .values(person)
            .returningAll()
            .executeTakeFirstOrThrow()
    }
    
    async deleteAppUser(id: number) {
        return await db.deleteFrom(Tables.app_users).where('user_id', '=', id)
            .returningAll()
            .executeTakeFirst()
    }
}

export const AppUserRepository = new AppUserModel();
