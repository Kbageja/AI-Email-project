import express from "express";
import multer from "multer";
import { recipientDataExtractor } from "../controllers/recipient.js";

const router = express.Router();

// Setup multer for file uploads
const upload = multer({ dest: "uploads/" });

// recipients data extracted and returned
router.post("/extract", upload.single("file"), recipientDataExtractor);

export default router;
