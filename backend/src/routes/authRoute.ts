import { Router } from "express";
import * as authContoller from "../controllers/authController"

const router = Router();

router.post("/register", authContoller.authChecking)
router.post("/login", authContoller.loginChecking)

export default router