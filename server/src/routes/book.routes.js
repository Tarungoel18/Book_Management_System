import {Router} from "express"
import authMiddleware from "../middlewares/auth.middleware.js";
import {addBook,getBooks} from "../controller/book.controller.js"

const router = Router();

router.post("/", authMiddleware, addBook);
router.get("/", authMiddleware, getBooks);

export default router;

