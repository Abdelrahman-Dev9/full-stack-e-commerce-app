import { Router } from "express";
import {
  createAddress,
  deleteAddress,
  forgotPassword,
  getAddress,
  getProfile,
  login,
  resetCode,
  resetPassword,
  signup,
  updateAddress,
  updateProfile,
  uploadUserImage,
  verifyCode,
} from "../controllers/auth.controller";
import { protect } from "../middleware/auth.middleware";
import upload from "../middleware/upload.middleware";
import { validation } from "../middleware/validations";
import { addressSchema } from "../validations/address.validation";
import {
  forgotPasswordSchema,
  loginSchema,
  resetPasswordSchema,
  signupSchema,
  updateProfileSchema,
  verifyResetCodeSchema,
} from "../validations/auth.validations";

const router = Router();

router.post("/signup", validation(signupSchema), signup);
router.post("/login", validation(loginSchema), login);
router.post(
  "/forgotPassword",
  validation(forgotPasswordSchema),
  forgotPassword
);
router.post("/verifyCode", validation(verifyResetCodeSchema), verifyCode);
router.post("/resetCode", resetCode);
router.post("/resetPassword", validation(resetPasswordSchema), resetPassword);
router.post("/profile", protect, getProfile);
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

router.put("/uploadUserImage", upload.single("image"), uploadUserImage);

export default router;
