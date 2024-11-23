import Campaign from "../models/campaign.js";
import sendResponse from "../utils/responseHandler.js";

export const createCampaign = async (req, res) => {
  const { name, description, status } = req.body;
  const user = req.user;

  if (!name || !description) {
    return sendResponse(res, 400, false, "Please enter all details");
  }

  try {
    const newCampaign = new Campaign({
      name,
      description,
      status: status || "draft",
      userId: user._id,
    });

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

export const updateCampaign = async (req, res) => {
  const { campaignId } = req.params;
  const { name, description, status } = req.body;

  if (!campaignId) {
    return sendResponse(res, 400, false, "Campaign ID is required");
  }

  if (!name && !description && !status) {
    return sendResponse(
      res,
      400,
      false,
      "At least one field is required to update"
    );
  }

  try {
    const updatedCampaign = await Campaign.findByIdAndUpdate(
      campaignId,
      {
        name: name || undefined,
        description: description || undefined,
        status: status || undefined,
      },
      { new: true, runValidators: true }
    );

    if (!updatedCampaign) {
      return sendResponse(res, 404, false, "Campaign not found");
    }

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
