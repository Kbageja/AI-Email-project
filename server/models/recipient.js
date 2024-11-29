import mongoose from "mongoose";

const RecipientSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    companyName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    campaignId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Campaign",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Recipient", RecipientSchema);
