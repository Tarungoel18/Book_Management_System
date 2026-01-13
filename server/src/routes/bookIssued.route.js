import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import { getBooksIssued, getBooksReturned, issueBook, markAsReturned,issuingBookToStudent , fetchIssuedBooksController,patchStatusController } from "../controller/bookIssued.controller.js";

const router = Router();
router.post("/",issuingBookToStudent);
router.get("/issuedBooks",fetchIssuedBooksController);
router.patch("/issuedBooks",patchStatusController);
router.get("/returnedBooks",getBooksReturned);

export default router;


//TODO 
// ADD MIDDLEWARE