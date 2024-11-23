import express from "express";
import {
  createCampaign,
  getUserCampaigns,
  updateCampaign,
} from "../controllers/campaign.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.post("/create", isAuthenticated, createCampaign);
router.put("/update/:campaignId", isAuthenticated, updateCampaign);
router.get("/getUserCampaigns", isAuthenticated, getUserCampaigns);

export default router;
