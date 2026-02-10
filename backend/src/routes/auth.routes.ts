import { Router } from "express";
import {
  forgotPassword,
  login,
  verifyResetCode,
  signup,
  resetPassword,
  getProfile,
} from "../controllers/auth.controller";
import { protect } from "../middleware/auth.middleware";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/forgotPassword", forgotPassword);
router.post("/verifyResetCode", verifyResetCode);
router.post("/resetPassword", resetPassword);
router.get("/profile", protect, getProfile);

export default router;
