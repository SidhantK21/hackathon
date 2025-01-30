import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { initailzeService } from "./services/milvusServices";
import router from "./routes/route";
import authRoutes from "./routes/authRoutes"; // ✅ Import auth routes

dotenv.config();

const app = express();
const port = process.env.PORT || 5000; // ✅ Default to port 5000 if env variable is missing

// ✅ Initialize external service
initailzeService();

// ✅ Enable CORS
app.use(
  cors({
    origin: "http://localhost:5173", // ✅ Allow frontend to access API
  })
);

app.use(express.json());

// ✅ Define API routes
app.use("/api", router); // ✅ General services
app.use("/api/auth", authRoutes); // ✅ Authentication routes

// ✅ Health Check Route
app.get("/", (req: Request, res: Response) => {
  res.send("🚀 Server is working!");
});

// ✅ Start Express Server
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
