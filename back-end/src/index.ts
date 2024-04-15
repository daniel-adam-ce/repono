
import dotenv from "dotenv";
import { createApp } from "./utils";
import sql from "./db";

dotenv.config({path: "./src/.env"});

const app = createApp();

const port = process.env.SERVER_PORT;

const server = app.listen( port, () => {
    console.log(`Server started on port ${port}.`);
})

server.on("close", () => {
    sql.end();
})