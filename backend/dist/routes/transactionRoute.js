"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const transactionController = __importStar(require("../controllers/transactionController"));
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const router = (0, express_1.Router)();
router.use(authMiddleware_1.default);
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
router.get("/statistics/category", transactionController.getExpenseByCategory);
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
exports.default = router;
//# sourceMappingURL=transactionRoute.js.map