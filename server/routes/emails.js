import express from "express";
import {
  emailSending,
  gamifiedEmailSending,
  generateEmailController,
} from "../controllers/emails.js";

const router = express.Router();

// API Endpoint: Generate Emails
router.post("/generate", generateEmailController);
router.post("/send-emails/:campaignId", emailSending);
router.post("/send-gamified-emails/:campaignId", gamifiedEmailSending);

export default router;
