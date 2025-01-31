"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client = new client_1.PrismaClient();
const authRouter = (0, express_1.Router)();
authRouter.post("/signup", async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        console.log(req.body);
        // // Validate required fields
        // if (!firstName || !lastName || !email || !password) {
        //      res.status(400).json({ message: "All fields are required" });
        //      return;
        // }
        // Check if user already exists
        const existingUser = await client.user.findUnique({
            where: { email }
        });
        if (existingUser) {
            res.status(400).json({ message: "Email already exists" });
            return;
        }
        // Hash password
        const saltRounds = 10;
        const hashedPassword = await bcrypt_1.default.hash(password, saltRounds);
        // Create new user
        const newUser = await client.user.create({
            data: {
                name: firstName + " " + lastName,
                email,
                password: hashedPassword
            },
        });
        res.json(newUser);
        return;
    }
    catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({ message: "Internal server error" });
        return;
    }
});
authRouter.post("/signin", async (req, res) => {
    try {
        const { email, password } = req.body;
        // Validate input
        if (!email || !password) {
            res.status(400).json({ message: "Email and password are required" });
            return;
        }
        // Find user by email
        const user = await client.user.findUnique({
            where: { email },
        });
        if (!user) {
            res.status(401).json({ message: "Invalid credentials" });
            return;
        }
        // Verify password
        const validPassword = await bcrypt_1.default.compare(password, user.password);
        if (!validPassword) {
            res.status(401).json({ message: "Invalid credentials" });
            return;
        }
        // Create JWT token
        const token = jsonwebtoken_1.default.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET || "default_secret", { expiresIn: "1h" });
        // Return user data without password
        const userData = {
            id: user.id,
            email: user.email,
            name: user.name,
            token,
        };
        res.status(200).json(userData);
        return;
    }
    catch (error) {
        console.error("Signin error:", error);
        res.status(500).json({ message: "Internal server error" });
        return;
    }
});
exports.default = authRouter;
