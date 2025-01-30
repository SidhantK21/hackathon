import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

interface TokenPayload {
  userId: number;
  name?: string;
}

// ✅ Middleware to Authenticate JWT Token
export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "❌ Unauthorized. Please log in." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as TokenPayload;
    (req as any).user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ error: "❌ Invalid token. Please log in again." });
  }
};
