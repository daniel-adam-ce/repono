import postgres from "postgres";
import dotenv from "dotenv";

dotenv.config({path: "./src/.env"});

const host = "localhost";
const port: number = Number(process.env.PG_PORT);
const database = process.env.PG_DATABASE;
const user = process.env.PG_USER;
const password = process.env.PG_PASSWORD;
const url = `postgres://${user}:${password}@${host}:${port}/${database}`;

const sql = postgres(url, {
    // ssl: true,
    // host: "localhost",
    // port: Number(process.env.PG_PORT),
    // database: process.env.PG_DATABASE,
    // username: process.env.PG_USER,
    // password: process.env.PG_PASSWORD
})

export default sql;
