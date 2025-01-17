import express from "express";
import multer from "multer";
import {
  addSingleGamifiedRecipient,
  addSingleRecipient,
  deleteGamifiedRecipient,
  deleteRecipient,
  gamifiedRecipientDataExtractor,
  getGamifiedRecipientsList,
  getRecipientsList,
  recipientDataExtractor,
} from "../controllers/recipient.js";

const router = express.Router();

// Setup multer for file uploads
const upload = multer({ dest: "uploads/" });

// recipients data extracted and returned
router.post(
  "/extract/:campaignId",
  upload.single("file"),
  recipientDataExtractor
);

router.post(
  "/extractGamingRecipient/:campaignId",
  upload.single("file"),
  gamifiedRecipientDataExtractor
);

router.post("/addSingleRecipient/:campaignId", addSingleRecipient);
router.get("/getRecipients/:campaignId", getRecipientsList);
router.delete("/deleteRecipient/:recipientId", deleteRecipient);

router.post(
  "/addSingleGamingRecipient/:campaignId",
  addSingleGamifiedRecipient
);

// Route to get the list of gamified recipients for a campaign
router.get("/getGamingRecipients/:campaignId", getGamifiedRecipientsList);

// Route to delete a gamified recipient by recipientId
router.delete("/deleteGamingRecipient/:recipientId", deleteGamifiedRecipient);

export default router;
