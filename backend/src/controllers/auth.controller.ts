import { Request, Response } from "express";
import prisma from "../prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendEmail } from "../utils/sendEmail";
import { generateToken } from "../utils/jwt";

export const signup = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    const { password: userPassword, ...userWithoutPassword } = newUser;

    res.status(201).json(userWithoutPassword);
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid Email or Password" });
    }

    const token = generateToken(user.id);

    const { password: userPassword, ...userWithoutPassword } = user;
    res.status(200).json({ data: userWithoutPassword, token });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;

  if (!email || typeof email !== "string") {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      // Don't reveal user existence
      return res.status(400).json({
        message:
          "this user doesn't exist,pls signup first then you can reset your password",
      });
    }

    // Generate reset code (e.g., 6 digit numeric code)
    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();

    // Optionally, set expiry (e.g., 1 hour from now)
    const expiry = new Date(Date.now() + 3600 * 1000);

    // Save reset code and expiry to user
    await prisma.user.update({
      where: { email },
      data: {
        resetCode,
        resetCodeExpiry: expiry,
      },
    });

    // Send email with reset code
    await sendEmail(
      email,
      "Your password reset code",
      `Your password reset code is: ${resetCode}. It will expire in 1 hour.`
    );

    return res.status(200).json({
      message: "Password reset code sent to your email",
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const verifyResetCode = async (req: Request, res: Response) => {
  const { email, code } = req.body;

  if (!email || !code) {
    return res.status(400).json({ error: "Email and code are required" });
  }

  // Fetch stored code and expiry for this email from your DB
  const record = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!record || record.resetCode !== code) {
    return res.status(400).json({ error: "Invalid reset code" });
  }

  if (new Date() > new Date(record.resetCodeExpiry!)) {
    return res.status(400).json({ error: "Reset code expired" });
  }

  // Optionally create a short-lived token for password reset authorization
  const resetToken = generateToken(email);

  await prisma.user.update({
    where: {
      email,
    },
    data: {
      resetPasswordToken: resetToken,
    },
  });

  return res.status(200).json({
    message: "Code verified. You can now reset password.",
    resetToken,
  });
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { token, newPassword } = req.body;

    const verifyUser = await prisma.user.findUnique({
      where: {
        resetPasswordToken: token,
      },
    });

    if (!verifyUser) {
      return res.status(400).json({ error: "Invalid reset token" });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: {
        resetPasswordToken: token,
      },
      data: {
        password: hashedNewPassword,
        resetPasswordToken: null,
        resetCode: null,
        resetCodeExpiry: null,
      },
    });

    return res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Reset password error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getProfile = async (
  req: Request & { user?: { id: string } }, // ✅ id is string
  res: Response
) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId }, // ✅ Prisma expects string
      select: {
        id: true,
        name: true,
        email: true,
        avatarUrl: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
