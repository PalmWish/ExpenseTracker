import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware";
import { financialChat, monthlyExpenseComparison } from "../controllers/aiController";

const router = Router();

router.use(authMiddleware)
router.post("/financial-chat", financialChat)
router.get("/monthly-comparison", monthlyExpenseComparison )

export default router;