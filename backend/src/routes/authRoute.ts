import { Router } from "express";
import * as authContoller from "../controllers/authController"
import authMiddleware from "../middlewares/authMiddleware";
const router = Router();

router.get("/profile", authMiddleware, authContoller.profile)
router.get("/user", authMiddleware, authContoller.idUser )
router.post("/register", authContoller.authChecking)
router.post("/login", authContoller.loginChecking)
router.put("/user", authMiddleware, authContoller.updateUser)
router.delete("/user", authMiddleware, authContoller.deleteUser)


export default router