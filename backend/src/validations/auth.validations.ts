import { signup } from "./../controllers/auth.controller";
import z from "zod";

export const signupSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z
    .string()
    .min(6, "Password require, must at least 6 characters")
    .regex(/[A-Z]/, "Password must contain an uppercase letter")
    .regex(/[0-9]/, "Password must contain a number"),
});

export const loginSchema = z.object({
  email: z.string("Invalid email").email(),
  password: z.string().min(6, "Password require, must at least 6 characters"),
});

export const forgotPasswordSchema = z.object({
  email: z.string("Invalid email").email(),
});

export const verifyResetCodeSchema = z.object({
  email: z.string().email(),
  code: z.string().min(6, "Code require, must at least 6 characters"),
});

export const resetPasswordSchema = z.object({
  token: z.string().min(10, "Invalid token"),
  newPassword: z
    .string()
    .min(6, "Password require at least 6 characters")
    .regex(/[A-Z]/, "Password must contain an uppercase letter")
    .regex(/[0-9]/, "Password must contain a number"),
});

export const updateProfileSchema = z.object({
  name: z.string().min(2).optional(),
  avatarUrl: z.string().url().optional(),
});
