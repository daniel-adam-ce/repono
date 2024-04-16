import { NewUser, Tables, User, UserUpdate, db } from "../db";

class UserModel {

    async findById(id: number): Promise<User> {
        return await db.selectFrom(Tables.users)
          .where('id', '=', id)
          .selectAll()
          .executeTakeFirst()
    }

    async findByEmail(email: string): Promise<User> {
        return await db.selectFrom(Tables.users)
            .where("email", "=", email)
            .selectAll()
            .executeTakeFirst()
    }

    async findAll(): Promise<Array<User>> {
        return await db.selectFrom(Tables.users).selectAll().execute();
    }

    async updatePerson(id: number, updateWith: UserUpdate) {
        await db.updateTable(Tables.users).set(updateWith).where('id', '=', id).execute()
    }
    
    async createUser(person: NewUser) {
        return await db.insertInto(Tables.users)
            .values(person)
            .returningAll()
            .executeTakeFirstOrThrow()
    }
    
    async deletePerson(id: number) {
        return await db.deleteFrom(Tables.users).where('id', '=', id)
            .returningAll()
            .executeTakeFirst()
    }
}

export const UserRepository = new UserModel();
