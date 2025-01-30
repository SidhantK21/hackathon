import express, { Request, Response } from "express";
import { signup, login, refreshAccessToken } from "../auth";

const router = express.Router();

// 🔹 Signup Route
router.post("/signup", async (req: Request, res: Response) => {
  try {
    const { name, email, password, confirmPassword } = req.body;
    const tokens = await signup(name, email, password, confirmPassword);
    res.json({ success: "✅ Account created!", ...tokens });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 🔹 Login Route
router.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const tokens = await login(email, password);
    res.json({ success: "✅ Welcome back!", ...tokens });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 🔹 Refresh Token Route
router.post("/refresh-token", async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;
    const tokens = await refreshAccessToken(refreshToken);
    res.json(tokens);
  } catch (error) {
    res.status(403).json({ error: error.message });
  }
});

export default router;
