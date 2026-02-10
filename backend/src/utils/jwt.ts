import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

// Create token
export const generateToken = (userId: string) => {
  return jwt.sign({ id: userId }, JWT_SECRET, {
    expiresIn: "7d", // token valid for 7 days
  });
};
