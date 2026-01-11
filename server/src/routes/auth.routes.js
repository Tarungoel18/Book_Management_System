import { Router } from "express";
import {login, refreshToken} from "../controller/auth.controller.js"
const router = Router();

router.post("/login",login);
router.post("/refresh-token",refreshToken)

export default router;