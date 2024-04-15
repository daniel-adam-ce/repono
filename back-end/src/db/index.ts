import postgres from "postgres";
import dotenv from "dotenv";

dotenv.config({path: "./src/.env"});

const host = "localhost";
const port: number = Number(process.env.PG_PORT);
const database = process.env.PG_DATABASE;
const user = process.env.PG_USER;
const password = process.env.PG_PASSWORD;
const url = `postgres://${user}:${password}@${host}:${port}/${database}`;

const sql = postgres(url)

process.on('exit', () => {
    console.log("ending");
    sql.end({timeout: 5})
});

export default sql;
