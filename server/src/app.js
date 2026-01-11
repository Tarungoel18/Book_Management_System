import express from "express";
import authRoutes from "./routes/auth.routes.js"
import bookRoutes from "./routes/book.routes.js"
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors())
app.use("/api/v1/auth",authRoutes);
app.use("/api/v1/books",bookRoutes);

export default app;