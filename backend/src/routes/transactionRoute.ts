import { Router } from "express";
import * as transactionController from "../controllers/transactionController";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router()

router.use(authMiddleware)

/**
 * @swagger
 * /api/transactions:
 *   get:
 *     summary: Get all transactions
 *     tags:
 *       - Transaction
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all transactions
 */
router.get("/", transactionController.getAll);

/**
 * @swagger
 * /api/transactions/summary:
 *   get:
 *     summary: Get transaction summary
 *     description: Returns total income, total expense and current balance.
 *     tags:
 *       - Transaction
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Transaction summary
 */
router.get("/summary", transactionController.summary);

/**
 * @swagger
 * /api/transactions/{id}:
 *   get:
 *     summary: Get transaction by ID
 *     tags:
 *       - Transaction
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Transaction ID
 *     responses:
 *       200:
 *         description: Transaction found
 *       404:
 *         description: Transaction not found
 */
router.get("/:id", transactionController.getById);

/**
 * @swagger
 * /api/transactions:
 *   post:
 *     summary: Create a new transaction
 *     tags:
 *       - Transaction
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - type
 *               - amount
 *               - category
 *             properties:
 *               type:
 *                 type: string
 *                 enum:
 *                   - income
 *                   - expense
 *                 example: expense
 *               amount:
 *                 type: number
 *                 example: 120
 *               category:
 *                 type: string
 *                 example: Food
 *               description:
 *                 type: string
 *                 example: KFC
 *               date:
 *                 type: string
 *                 format: date
 *                 example: 2026-07-08
 *     responses:
 *       201:
 *         description: Transaction created successfully
 */
router.post("/", transactionController.create);

/**
 * @swagger
 * /api/transactions/{id}:
 *   put:
 *     summary: Update a transaction
 *     tags:
 *       - Transaction
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Transaction ID
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *                 enum:
 *                   - income
 *                   - expense
 *               amount:
 *                 type: number
 *               category:
 *                 type: string
 *               description:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Transaction updated successfully
 */
router.put("/:id", transactionController.update);

/**
 * @swagger
 * /api/transactions/{id}:
 *   delete:
 *     summary: Delete a transaction
 *     tags:
 *       - Transaction
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Transaction ID
 *     responses:
 *       200:
 *         description: Transaction deleted successfully
 */
router.delete("/:id", transactionController.remove);


export default router;