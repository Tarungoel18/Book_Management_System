import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import { addStudent } from "../controller/students.controller.js";
import { getStudents } from "../controller/students.controller.js";
const router = Router();
router.post("/",addStudent);
router.get("/",getStudents);

export default router;


//TODO 
// ADD MIDDLEWARE