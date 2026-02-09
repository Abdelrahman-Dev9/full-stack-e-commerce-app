import { Router } from "express";
import {
  forgotPassword,
  login,
  verifyResetCode,
  signup,
} from "../controllers/auth.controller";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/forgotPassword", forgotPassword);
router.post("/verifyResetCode", verifyResetCode);

export default router;
