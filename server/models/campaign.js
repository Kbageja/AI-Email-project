import mongoose from "mongoose";

const CampaignSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, default: "draft" },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["gamified", "normal"],
      required: true,
    },
    rewards: { type: [String] }, // Only relevant for 'gamified' campaigns
    logoUrl: { type: String }, // Only relevant for 'gamified' campaigns
    validUntil: { type: Date }, // Only relevant for 'gamified' campaigns
  },
  { timestamps: true }
);

export default mongoose.model("Campaign", CampaignSchema);
