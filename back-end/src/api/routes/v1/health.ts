import { Router } from "express";
import { getUser, healthCheck } from "../../controllers";

const route = Router();

const health = (router: Router) => {
    router.use("/health", route);

    route.get("/", healthCheck)
}

export default health;