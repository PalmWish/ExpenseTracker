import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger";
import authRoutes from "./routes/authRoute";
import transactionRoutes from "./routes/transactionRoute";
import connectDB from "./config/db";

const app = express();

app.use(cors({ origin: "https://expense-tracker-seven-eta-59.vercel.app" }));
app.use(express.json());

app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error("DB connection error:", error);
    res.status(500).json({ message: "Database connection failed" });
  }
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);

export default app;