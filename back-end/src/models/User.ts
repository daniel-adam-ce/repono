import sql from "../db";

export interface User {
    readonly id: number,
    readonly email: string,
}

class UserModelClass {
    async findById(id: number | string): Promise<User | undefined> {
        return sql<User[]>`SELECT * FROM users WHERE id = ${id} LIMIT 1`.then((res) => {
            return res[0]
        });
    }

    async findByEmail(email: string): Promise<User | undefined> {
        return sql<User[]>`SELECT * FROM users WHERE email = ${email} LIMIT 1`.then((res) => {
            return res[0]
        });
    }

    async findAll(): Promise<User[]> {
        return sql<User[]>`SELECT * FROM users`;
    }

    async createUser(email: string): Promise<User | undefined> {
        return sql<User[]>`INSERT INTO users (id, email) VALUES (DEFAULT, ${email})`.then((res) => {
            console.log(res);
            return res[0]
        })
    }
}

export const UserModel = new UserModelClass()
