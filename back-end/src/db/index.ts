import { Pool } from 'pg';
import { Kysely, PostgresDialect } from 'kysely';
import dotenv from "dotenv";
import { Database } from './database';

dotenv.config({path: "./src/.env"});


const host = process.env.PG_HOST;
const port: number = Number(process.env.PG_PORT);
const database = process.env.PG_DATABASE;
const user = process.env.PG_USER;
const password = process.env.PG_PASSWORD;

const dialect = new PostgresDialect({
    pool: new Pool({
        database: database,
        host: host,
        user: user,
        password: password,
        port: port,
        ssl: {
            rejectUnauthorized: false
        },
        max: 10,
    })
})

export const db = new Kysely<Database>({
    dialect,
})

export * from "./database";