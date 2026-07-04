import { Router } from "express";
import * as authContoller from "../controllers/authController"
import authMiddleware from "../middlewares/authMiddkeware";
const router = Router();

router.post("/register", authContoller.authChecking)
router.post("/login", authContoller.loginChecking)
router.get("/profile", authMiddleware, authContoller.profile)

export default router