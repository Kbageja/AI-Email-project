import mongoose from "mongoose";

const GamifiedRecipientSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    status: {
      type: String,
      enum: ["not_played", "won"], // Only track 'not_played' or 'won'
      default: "not_played", // Initial status
    },
    reward: { type: String }, // Store the reward if won (e.g., '10% discount')
    campaignId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "GamifiedCampaign",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("GamifiedRecipient", GamifiedRecipientSchema);
