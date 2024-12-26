import csvParser from "csv-parser";
import fs from "fs";
import xlsx from "xlsx"; // For handling Excel files
import RecipientSchema from "../models/recipient.js";
import sendResponse from "../utils/responseHandler.js";

export const recipientDataExtractor = async (req, res) => {
  const filePath = req.file.path;
  const recipients = [];
  const campaignId = req.params.campaignId; // Extract campaignId from the route parameters

  if (!campaignId) {
    return sendResponse(res, 400, false, "Campaign ID is required.");
  }

  try {
    const { mimetype } = req.file;

    if (mimetype === "application/json") {
      const data = JSON.parse(fs.readFileSync(filePath));
      data.forEach((recipient) => {
        recipients.push({
          ...recipient,
          campaignId, // Add campaignId to each recipient
        });
      });
    } else if (mimetype === "text/csv") {
      fs.createReadStream(filePath)
        .pipe(csvParser())
        .on("data", (row) => {
          recipients.push({
            email: row.email,
            companyName: row.companyName,
            description: row.description,
            campaignId, // Add campaignId to each recipient
          });
        })
        .on("end", async () => {
          try {
            // Save recipients to the database
            await RecipientModel.insertMany(recipients);
            fs.unlinkSync(filePath); // Delete temporary file
            return sendResponse(
              res,
              200,
              true,
              "Recipients extracted and saved successfully.",
              recipients
            );
          } catch (err) {
            fs.unlinkSync(filePath);
            return sendResponse(
              res,
              500,
              false,
              "Error saving recipients",
              err.message
            );
          }
        });
      return; // Exit here since the response is sent asynchronously
    } else if (
      mimetype.includes("spreadsheet") ||
      mimetype ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      const workbook = xlsx.readFile(filePath);
      const sheetName = workbook.SheetNames[0];
      const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
      sheetData.forEach((row) => {
        recipients.push({
          email: row.email,
          companyName: row.companyName,
          description: row.description,
          campaignId, // Add campaignId to each recipient
        });
      });
    } else {
      return sendResponse(
        res,
        400,
        false,
        "Unsupported file format. Please upload JSON, CSV, or Excel files."
      );
    }

    // Save the extracted data
    await RecipientSchema.insertMany(recipients);

    // Delete temporary file
    fs.unlinkSync(filePath);

    // Respond with the extracted and saved data
    return sendResponse(
      res,
      200,
      true,
      "Recipients extracted and saved successfully.",
      recipients
    );
  } catch (err) {
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    return sendResponse(res, 500, false, "Error processing file.", err.message);
  }
};

export const addSingleRecipient = async (req, res) => {
  const { campaignId } = req.params;
  const { email, companyName, description } = req.body;

  if (!campaignId) {
    return sendResponse(res, 400, false, "Invalid campaignId");
  }

  if (!email || !companyName || !description) {
    return sendResponse(res, 400, false, "All fields are required.");
  }

  try {
    const newRecipient = new RecipientSchema({
      email,
      companyName,
      description,
      campaignId,
    });

    await newRecipient.save();
    return sendResponse(
      res,
      201,
      true,
      "Recipient added successfully.",
      newRecipient
    );
  } catch (error) {
    return sendResponse(
      res,
      500,
      false,
      "Error saving recipient.",
      err.message
    );
  }
};

export const getRecipientsList = async (req, res) => {
  const { campaignId } = req.params; // Extract campaignId from the URL parameters

  if (!campaignId) {
    return sendResponse(res, 400, false, "Campaign ID is required.");
  }

  try {
    // Fetch recipients associated with the given campaignId
    const recipients = await RecipientSchema.find({ campaignId });

    if (recipients.length === 0) {
      return sendResponse(
        res,
        404,
        false,
        "No recipients found for this campaign."
      );
    }

    // Send the list of recipients in the response
    return sendResponse(
      res,
      200,
      true,
      "Recipients fetched successfully.",
      recipients
    );
  } catch (err) {
    return sendResponse(
      res,
      500,
      false,
      "Server error while fetching recipients",
      err.message
    );
  }
};

export const deleteRecipient = async (req, res) => {
  const { recipientId } = req.params;

  if (!recipientId) {
    return sendResponse(res, 400, false, "Recipient ID is required.");
  }

  try {
    const deletedRecipient = await RecipientSchema.findByIdAndDelete(
      recipientId
    );
    if (!deletedRecipient) {
      return sendResponse(res, 404, false, "Recipient not found.");
    }

    // Send success response
    return sendResponse(res, 200, true, "Recipient deleted successfully.");
  } catch (err) {
    return sendResponse(
      res,
      500,
      false,
      "Server error while deleting recipient",
      err.message
    );
  }
};
