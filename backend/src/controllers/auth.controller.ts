import { Request, Response } from "express";
import prisma from "../prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendEmail } from "../utils/sendEmail";

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

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });

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
