import { Router } from "express";
import { checkSession, establishSession, googleOAuth } from "@/api/controllers";
import { validateToken } from "@/api/middleware";

const route = Router();

const session = (router: Router) => {
    router.use("/session", route);

    route.get("/", validateToken(), checkSession);
    route.get("/oauth", googleOAuth);
    route.get("/callback", establishSession);
    
    // in case of future oauths, use this structure
    // route.get("/oauth/:provider", googleOAuth);
    // route.get("/oauth/:provider/callback", establishSession);
}

export default session;