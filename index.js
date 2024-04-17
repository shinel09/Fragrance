import express from "express";
import dotenv from "dotenv";
// import cors from "cors";
// import helmet from "helmet";
import multer from "multer";
import { connectDB } from "./src/db.config.js";
import authRouter from "./src/routes/auth.js";
import categoryRouter from "./src/routes/category.js";
import productRouter from "./src/routes/product.js";
import orderRouter from "./src/routes/order.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;
const dbUrl = process.env.MONGODB_URL;

// Middleware
app.use(express.json());
// app.use(cors()); 
// app.use(helmet()); 



// Connect to DB
connectDB(dbUrl);

// Routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/order", orderRouter);




app.listen(port, () => {
  console.log(`Fragrance Hub Server listening on port ${port}`);
});