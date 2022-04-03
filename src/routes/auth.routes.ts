import controller from "../controllers/auth.controller";
import { Router } from "express";

const router: Router = Router()

router.post("/auth/signup", controller.signup);

router.post("/auth/signin", controller.signin);

export default router
