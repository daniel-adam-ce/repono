import { Router } from "express";
import { getUsers, healthCheck } from "@/api/controllers";

const route = Router();

const health = (router: Router) => {
    router.use("/health", route);

    route.get("/", healthCheck)
}

export default health;