
import dotenv from "dotenv";
import express from "express"
import loaders from "./loaders";

dotenv.config({path: "./src/.env"});

const startApp = async () => {
    const app = express();

    await loaders(app);

    const port = process.env.SERVER_PORT;

    app.listen( port, () => {
        console.log(`Server started on port ${port}.`);
    })
}

startApp();