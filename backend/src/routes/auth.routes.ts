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
  updateAddress,
  deleteAddress,
} from "../controllers/auth.controller";
import { protect } from "../middleware/auth.middleware";
import { validation } from "../middleware/validations";
import {
  forgotPasswordSchema,
  loginSchema,
  resetPasswordSchema,
  signupSchema,
  updateProfileSchema,
  verifyResetCodeSchema,
} from "../validations/auth.validations";
import { addressSchema } from "../validations/address.validation";

const router = Router();

router.post("/signup", validation(signupSchema), signup);
router.post("/login", validation(loginSchema), login);
router.post(
  "/forgotPassword",
  validation(forgotPasswordSchema),
  forgotPassword
);
router.post(
  "/verifyResetCode",
  validation(verifyResetCodeSchema),
  verifyResetCode
);
router.post("/resetPassword", validation(resetPasswordSchema), resetPassword);
router.get("/profile", protect, getProfile);
router.put(
  "/updateProfile",
  protect,
  validation(updateProfileSchema),
  updateProfile
);
router.get("/getAddress", protect, getAddress);
router.post(
  "/createAddress",
  protect,
  validation(addressSchema),
  createAddress
);
router.put("/updateAddress", protect, validation(addressSchema), updateAddress);
router.delete("/deleteAddress", protect, deleteAddress);

export default router;
