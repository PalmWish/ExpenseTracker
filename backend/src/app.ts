import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoute";
import transactionRoutes from "./routes/transactionRoute";
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes)
app.use("/api/transactions", transactionRoutes)

export default app;