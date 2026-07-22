import { Router } from "express";
import * as authContoller from "../controllers/authController"
import authMiddleware from "../middlewares/authMiddleware";
const router = Router();

/**
 * @swagger
 * /api/auth/profile:
 *   get:
 *     summary: Get current user profile
 *     tags:
 *       - Auth
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 */
router.get("/profile", authMiddleware, authContoller.profile)

/**
 * @swagger
 * /api/auth/user:
 *   get:
 *     summary: Get current user by ID
 *     tags:
 *       - Auth
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User information retrieved successfully
 */
router.get("/user", authMiddleware, authContoller.idUser )

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: Palm
 *               email:
 *                 type: string
 *                 example: palm@gmail.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       201:
 *         description: User registered successfully
 */
router.post("/register", authContoller.authChecking)

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: palm@gmail.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Login successful
 */
router.post("/login", authContoller.loginChecking)

/**
 * @swagger
 * /api/auth/user:
 *   put:
 *     summary: Update current user
 *     tags:
 *       - Auth
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Palm New
 *               email:
 *                 type: string
 *                 example: palmnew@gmail.com
 *               password:
 *                 type: string
 *                 example: newpassword123
 *     responses:
 *       200:
 *         description: User updated successfully
 */
router.put("/user", authMiddleware, authContoller.updateUser)

/**
 * @swagger
 * /api/auth/user:
 *   delete:
 *     summary: Delete current user
 *     tags:
 *       - Auth
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User deleted successfully
 */
router.delete("/user", authMiddleware, authContoller.deleteUser)


export default router