import csvParser from "csv-parser";
import fs from "fs";
import xlsx from "xlsx"; // For handling Excel files

export const recipientDataExtractor = async (req, res) => {
  const filePath = req.file.path;
  const recipients = [];

  try {
    const { mimetype } = req.file;

    if (mimetype === "application/json") {
      // Handle JSON file
      const data = JSON.parse(fs.readFileSync(filePath));
      recipients.push(...data);
    } else if (mimetype === "text/csv") {
      // Handle CSV file
      fs.createReadStream(filePath)
        .pipe(csvParser())
        .on("data", (row) => {
          recipients.push({
            email: row.email,
            companyName: row.companyName,
            description: row.description,
          });
        })
        .on("end", () => {
          fs.unlinkSync(filePath); // Delete temporary file
          return res.status(200).json({
            message: "Recipients extracted successfully.",
            recipients,
          });
        });
      return; // Exit here since the response is sent asynchronously
    } else if (
      mimetype.includes("spreadsheet") ||
      mimetype ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      // Handle Excel file
      const workbook = xlsx.readFile(filePath);
      const sheetName = workbook.SheetNames[0]; // Assume first sheet
      const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
      recipients.push(
        ...sheetData.map((row) => ({
          email: row.email,
          companyName: row.companyName,
          description: row.description,
        }))
      );
    } else {
      return res.status(400).json({
        message:
          "Unsupported file format. Please upload JSON, CSV, or Excel files.",
      });
    }

    // Delete the temporary file
    fs.unlinkSync(filePath);

    // Respond with the extracted data
    res
      .status(200)
      .json({ message: "Recipients extracted successfully.", recipients });
  } catch (err) {
    // Delete temporary file if an error occurs
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

    res
      .status(500)
      .json({ message: "Error processing file.", error: err.message });
  }
};
