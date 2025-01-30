import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();

interface TokenPayload {
  userId: number;
  name?: string;
}

// ✅ Function to Generate Access & Refresh Tokens
const generateTokens = (user: User) => {
  const accessToken = jwt.sign(
    { userId: user.id, name: user.name } as TokenPayload,
    process.env.JWT_SECRET as string,
    { expiresIn: "7d" } // 🔥 Token valid for 7 days
  );

  const refreshToken = jwt.sign(
    { userId: user.id } as TokenPayload,
    process.env.REFRESH_SECRET as string,
    { expiresIn: "30d" } // 🔥 Refresh token valid for 30 days
  );

  return { accessToken, refreshToken };
};

// ✅ Signup Function
export const signup = async (name: string, email: string, password: string, confirmPassword: string) => {
  if (!email || !password || !confirmPassword) throw new Error("⚠️ All fields are required.");
  if (password !== confirmPassword) throw new Error("❌ Passwords do not match.");

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) throw new Error("❌ Email already registered. Please log in.");

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await prisma.user.create({
    data: { name, email, password: hashedPassword },
  });

  return generateTokens(newUser);
};

// ✅ Login Function
export const login = async (email: string, password: string) => {
  if (!email || !password) throw new Error("⚠️ Please enter both email and password.");

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error("❌ No account found. Please sign up first.");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("❌ Incorrect password. Try again.");

  return generateTokens(user);
};

// ✅ Refresh Token Function
export const refreshAccessToken = async (refreshToken: string) => {
  if (!refreshToken) throw new Error("❌ No refresh token provided.");

  const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET as string) as TokenPayload;
  const user = await prisma.user.findUnique({ where: { id: decoded.userId } });

  if (!user) throw new Error("❌ Invalid refresh token.");

  return generateTokens(user);
};
