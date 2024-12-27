import express from "express";
import { generateEmailController } from "../controllers/generateEmail.js";

const router = express.Router();

// API Endpoint: Generate Emails
router.post("/generate", generateEmailController);

export default router;
