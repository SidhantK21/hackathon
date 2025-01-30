import express from "express";
import pdfRouter from "./pdfUpload";
import queryrouter from "./queryRoute";
import authRoutes from "./authRoutes";

const router=express.Router();

router.use("/datatoprocess",pdfRouter);
router.use("/askai",queryrouter);
router.use("/auth", authRoutes);

export default router;

