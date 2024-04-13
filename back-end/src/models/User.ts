import sql from "../db";

export interface User {
    readonly id: number,
    readonly email: string,
}

class UserModelClass {
    async findById(id: number | string): Promise<User> {
        return sql<User[]>`SELECT * FROM users WHERE id = ${id} LIMIT 1`.then((res) => {
            return res[0]
        });
    }

    async findByEmail(email: string) {
        return sql<User[]>`SELECT * FROM users WHERE email = ${email} LIMIT 1`;
    }

    async findAll() {
        return sql<User[]>`SELECT * FROM users`;
    }
}

export const UserModel = new UserModelClass()
