import {Router} from "express";
import { registerValidation } from "../validator/auth.validatoe.js";

const router = Router();

router.post("/register", registerValidation);

export default router;


