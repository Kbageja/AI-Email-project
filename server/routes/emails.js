import express from "express";
import {
  emailSending,
  gamifiedEmailSending,
  generateEmailController,
} from "../controllers/emails.js";

const router = express.Router();

// API Endpoint: Generate Emails
router.post("/generate", generateEmailController);
router.post("/send-emails", emailSending);
router.post("/send-gamified-emails", gamifiedEmailSending);

export default router;
