import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware";
import { financialChat } from "../controllers/aiController";

const router = Router();

router.post("/financial-chat", authMiddleware, financialChat)

export default router;