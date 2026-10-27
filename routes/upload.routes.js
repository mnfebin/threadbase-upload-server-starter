import { Router } from "express";
import multer from "multer";
import { verifyToken } from "../middleware/auth.js";
import upload from "../config/upload.js";

const router = Router();

router.post("/upload", verifyToken, upload.single("avatar"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "An image file is required in the avatar field" });
  }

  res.status(201).json({ url: `/uploads/${req.file.filename}` });
});

router.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    return res.status(400).json({ error: error.message });
  }
  next(error);
});

export default router;
