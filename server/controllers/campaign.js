import Campaign from "../models/campaign.js";
import sendResponse from "../utils/responseHandler.js";

//create campaign
export const createCampaign = async (req, res) => {
  const { name, description, status } = req.body;
  const user = req.user;
  const { type } = req.params; // Extract type from params

  // Validate type to ensure it's either 'normal' or 'gamified'
  if (!["normal", "gamified"].includes(type)) {
    return sendResponse(
      res,
      400,
      false,
      "Invalid campaign type. It must be 'normal' or 'gamified'."
    );
  }

  // Validate required fields
  if (!name || !description) {
    return sendResponse(res, 400, false, "Please enter all details");
  }

  try {
    const newCampaign = new Campaign({
      name,
      description,
      status: status || "draft",
      userId: user._id,
      type, // Set the type (normal or gamified)
    });

    // If the type is gamified, you can optionally add gamified-specific fields
    if (type === "gamified") {
      const { rewards, logoUrl, validUntil } = req.body;
      if (!rewards || !logoUrl || !validUntil) {
        return sendResponse(
          res,
          400,
          false,
          "Gamified campaigns require rewards, logoUrl, and validUntil."
        );
      }
      newCampaign.rewards = rewards;
      newCampaign.logoUrl = logoUrl;
      newCampaign.validUntil = validUntil;
    }

    const savedCampaign = await newCampaign.save();
    return sendResponse(
      res,
      201,
      true,
      "Campaign created successfully",
      savedCampaign
    );
  } catch (error) {
    console.error(error);
    return sendResponse(
      res,
      500,
      false,
      "Server error while creating campaign"
    );
  }
};

//update campaign
export const updateCampaign = async (req, res) => {
  const { campaignId, type } = req.params; // Extract campaignId and type from params
  const { name, description, status, rewards, logoUrl, validUntil } = req.body;

  // Validate campaignId and type
  if (!campaignId) {
    return sendResponse(res, 400, false, "Campaign ID is required");
  }

  if (!["normal", "gamified"].includes(type)) {
    return sendResponse(
      res,
      400,
      false,
      "Invalid campaign type. It must be 'normal' or 'gamified'."
    );
  }

  // Validate at least one field to update
  if (!name && !description && !status && !rewards && !logoUrl && !validUntil) {
    return sendResponse(
      res,
      400,
      false,
      "At least one field is required to update"
    );
  }

  try {
    // Find the campaign by ID
    const campaign = await Campaign.findById(campaignId);

    if (!campaign) {
      return sendResponse(res, 404, false, "Campaign not found");
    }

    // Ensure the campaign type is not changed (if necessary)
    if (campaign.type !== type) {
      return sendResponse(res, 400, false, "Cannot change campaign type.");
    }

    // Update fields
    const updatedCampaign = await Campaign.findByIdAndUpdate(
      campaignId,
      {
        name: name || undefined,
        description: description || undefined,
        status: status || undefined,
        rewards: type === "gamified" ? rewards : undefined, // Only update rewards for gamified campaigns
        logoUrl: type === "gamified" ? logoUrl : undefined, // Only update logoUrl for gamified campaigns
        validUntil: type === "gamified" ? validUntil : undefined, // Only update validUntil for gamified campaigns
      },
      { new: true, runValidators: true }
    );

    return sendResponse(
      res,
      200,
      true,
      "Campaign updated successfully",
      updatedCampaign
    );
  } catch (error) {
    console.error(error);
    return sendResponse(
      res,
      500,
      false,
      "Server error while updating campaign"
    );
  }
};

// get all campaigns created by users
export const getUserCampaigns = async (req, res) => {
  const userId = req.user._id;

  try {
    const campaigns = await Campaign.find({ userId });

    if (!campaigns || campaigns.length === 0) {
      return sendResponse(
        res,
        404,
        false,
        "No campaigns found for this user",
        []
      );
    }

    return sendResponse(
      res,
      200,
      true,
      "Campaigns retrieved successfully",
      campaigns
    );
  } catch (error) {
    console.error(error);
    return sendResponse(
      res,
      500,
      false,
      "Server error while retrieving campaigns"
    );
  }
};

// delete capaign
export const deleteCampaign = async (req, res) => {
  const { campaignId } = req.params;
  if (!campaignId) {
    return sendResponse(res, 400, false, "Campaign ID is required");
  }

  try {
    const deletedCampaign = await Campaign.findByIdAndDelete(campaignId);

    if (!deletedCampaign) {
      return sendResponse(res, 404, false, "Campaign not found");
    }

    return sendResponse(
      res,
      200,
      true,
      "Campaign deleted successfully",
      deletedCampaign
    );
  } catch (error) {
    console.error(error);
    return sendResponse(
      res,
      500,
      false,
      "Server error while deleting campaign"
    );
  }
};
