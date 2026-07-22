import dotenv from "dotenv";
import swaggerUi  from "swagger-ui-express";
import swaggerSpec from "./config/swagger"


dotenv.config();

import app from "./app";
import connectDB from "./config/db";

const PORT = process.env.PORT || 3000;

connectDB();

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))
app.listen(PORT, ()=> {
    console.log(`Server running on port ${PORT}`);
})


