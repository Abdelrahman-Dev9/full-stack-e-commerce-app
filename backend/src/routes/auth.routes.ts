import { Router } from "express";
import {
  forgotPassword,
  login,
  verifyResetCode,
  signup,
  resetPassword,
} from "../controllers/auth.controller";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/forgotPassword", forgotPassword);
router.post("/verifyResetCode", verifyResetCode);
router.post("/resetPassword", resetPassword);

export default router;
