import express from "express";
import authRoutes from "./routes/auth.routes.js"
import bookRoutes from "./routes/book.routes.js"
import studentRoutes from "./routes/student.route.js"
import bookIssuedRoutes from "./routes/bookIssued.route.js"
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
app.use(bodyParser.json());

app.use(express.json());
app.use(cors())
app.use("/api/v1/auth",authRoutes);
app.use("/api/v1/books",bookRoutes);
app.use("/api/v1/students",studentRoutes);
app.use("/api/v1/booksIssued",bookIssuedRoutes);

export default app;