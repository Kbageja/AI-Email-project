import express from "express";
import multer from "multer";
import {
  addSingleRecipient,
  deleteRecipient,
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

router.post("/addSingleRecipient/:campaignId", addSingleRecipient);
router.get("/getRecipients/:campaignId", getRecipientsList);
router.delete("/deleteRecipient/:recipientId", deleteRecipient);

export default router;
