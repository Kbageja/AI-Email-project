import express from "express";
import {
  emailSending,
  generateEmailController,
} from "../controllers/emails.js";

const router = express.Router();

// API Endpoint: Generate Emails
router.post("/generate", generateEmailController);
router.post("/send-emails", emailSending);

export default router;
