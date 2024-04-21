import { NewUser, Tables, User, UserUpdate, db } from "../db";

class UserModel {

    async findById(id: number): Promise<User> {
        return await db.selectFrom(Tables.app_users)
          .where('user_id', '=', id)
          .selectAll()
          .executeTakeFirst()
    }

    async findByEmail(email: string): Promise<User> {
        return await db.selectFrom(Tables.app_users)
            .where("email", "=", email)
            .selectAll()
            .executeTakeFirst()
    }

    async findAll(): Promise<Array<User>> {
        return await db.selectFrom(Tables.app_users).selectAll().execute();
    }

    async updateUser(id: number, updateWith: UserUpdate) {
        await db.updateTable(Tables.app_users).set(updateWith).where('user_id', '=', id).execute()
    }
    
    async createUser(person: NewUser) {
        return await db.insertInto(Tables.app_users)
            .values(person)
            .returningAll()
            .executeTakeFirstOrThrow()
    }
    
    async deleteUser(id: number) {
        return await db.deleteFrom(Tables.app_users).where('user_id', '=', id)
            .returningAll()
            .executeTakeFirst()
    }
}

export const UserRepository = new UserModel();
