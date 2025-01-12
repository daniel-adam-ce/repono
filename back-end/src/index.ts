
import dotenv from "dotenv";
import { createApp } from "./utils";

dotenv.config({path: "./src/.env"});

const app = createApp();

const port = process.env.SERVER_PORT;

app.listen( port, () => {
    console.log(`Server started on port ${port}.`);
})