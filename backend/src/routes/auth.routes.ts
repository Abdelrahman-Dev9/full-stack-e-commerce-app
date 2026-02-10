import { Router } from "express";
import {
  forgotPassword,
  login,
  verifyResetCode,
  signup,
  resetPassword,
  getProfile,
  updateProfile,
  createAddress,
  getAddress,
} from "../controllers/auth.controller";
import { protect } from "../middleware/auth.middleware";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/forgotPassword", forgotPassword);
router.post("/verifyResetCode", verifyResetCode);
router.post("/resetPassword", resetPassword);
router.get("/profile", protect, getProfile);
router.put("/updateProfile", protect, updateProfile);
router.get("/getAddress", protect, getAddress);
router.post("/createAddress", protect, createAddress);

export default router;
