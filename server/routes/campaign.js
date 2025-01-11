import express from "express";
import {
  createCampaign,
  deleteCampaign,
  getUserCampaigns,
  updateCampaign,
} from "../controllers/campaign.js";

const router = express.Router();

router.post("/create/:type", createCampaign);
router.put("/update/:campaignId/:type", updateCampaign);
router.get("/getUserCampaigns", getUserCampaigns);
router.delete("/delete/:campaignId", deleteCampaign);

export default router;
