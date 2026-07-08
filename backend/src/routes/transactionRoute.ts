import { Router } from "express";
import * as transactionController from "../controllers/transactionController";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router()

router.use(authMiddleware)

router.get("/", transactionController.getAll)
router.get("/:id", transactionController.getById)
router.post("/", transactionController.create)
router.put("/:id", transactionController.update)
router.delete("/:id", transactionController.remove)

export default router;