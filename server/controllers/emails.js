import { OpenAI } from "openai"; // Import OpenAI from the new SDK
import axios from "axios"; // Axios for making HTTP requests
import NodeCache from "node-cache"; // In-memory cache (replacing Redis)
import nodemailer from "nodemailer";
import handlebars from "handlebars";
import { fileURLToPath } from "url";
import fs from "fs/promises";
import path from "path";
import Campaign from "../models/campaign.js";

// OpenAI Configuration
const openai = new OpenAI({
  apiKey:"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", // Ensure your API key is set in the environment
});

// Axios Instance for external API calls
const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api", // Replace with your API's base URL
  timeout: 5000, // Optional: set a timeout
});

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_SENDER, // Replace with your email
    pass: process.env.EMAIL_PASS, // Replace with your email password or app password
  },
});

// In-memory cache configuration
const cache = new NodeCache({ stdTTL: 3600 }); // Cache for 1 hour

// Fetch Company Info with Caching and Retry Logic
export const fetchCompanyInfo = async (companyName, retries = 3) => {
  try {
    // Check if the company info is already cached
    const cachedInfo = cache.get(`company:${companyName}`);
    if (cachedInfo) return cachedInfo;

    // Fetch company info from external API
    const response = await axiosInstance.get(`/company?name=${companyName}`);
    const companyInfo = response.data;
    // Cache the result for 1 hour
    cache.set(`company:${companyName}`, companyInfo);
    return companyInfo;
  } catch (error) {
    if (retries > 0) {
      console.warn(
        `Retrying fetch for company: ${companyName}. Attempts left: ${retries}`
      );
      return fetchCompanyInfo(companyName, retries - 1);
    }
    console.error(
      `Failed to fetch company info for ${companyName} after retries:`,
      error
    );
    return null; // Return null if all retries fail
  }
};

// Helper Function: Generate Email Content
export const generateEmailContent = async (recipient, companyInfo) => {
  try {
    const prompt = `
    Write a professional email to ${recipient.email} about ${
      recipient.description
    }.
    Use the following company information about ${recipient.companyName}: ${
      companyInfo
        ? JSON.stringify(companyInfo)
        : "No company information provided."
    }
    The email should focus on how the company information about ${
      recipient.companyName
    } (e.g., recent achievements, funding, market position, challenges, etc.) can help highlight the relevance and benefits of the description you are providing.
    Emphasize how the description aligns with ${
      recipient.companyName
    }'s current needs or goals and how it can help them achieve those goals faster or more effectively, based on their current situation.
    Ensure the tone is professional, clear, and concise, and position the description as a valuable opportunity for ${
      recipient.companyName
    }.
    Keep the email under 150 words (it can be less, but should not exceed 150 words).
  `;

    // Using the new SDK to generate a completion
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini", // Use the appropriate model (e.g., GPT-4)
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: prompt },
      ],
    });

    // Return the generated text
    return completion.choices[0].message.content.trim();
  } catch (error) {
    console.error(`Error generating email for ${recipient.email}:`, error);
    throw new Error("Failed to generate email");
  }
};

export const generateEmailController = async (req, res) => {
  const { recipients } = req.body;

  if (!recipients || recipients.length === 0) {
    return res.status(400).json({ error: "Invalid request data" });
  }

  try {
    const emailPromises = recipients.map(async (recipient) => {
      // Fetch company info with retry logic and fallback
      const companyInfo = await fetchCompanyInfo(recipient.companyName);

      // Generate email content with or without company info
      const content = await generateEmailContent(recipient, companyInfo);

      return {
        email: recipient.email,
        content,
      };
    });

    const emails = await Promise.all(emailPromises);

    res.status(200).json({ emails });
  } catch (error) {
    console.error("Error generating emails:", error);
    res.status(500).json({ error: "Failed to generate emails" });
  }
};

export const emailSending = async (req, res) => {
  const { emails } = req.body; // Extract the email data from the request body
  const { campaignId } = req.params;

  if (!emails || !Array.isArray(emails)) {
    return res.status(400).json({ error: "Invalid email data format." });
  }

  try {
    // Iterate over each email object in the array
    for (const { email, content } of emails) {
      const subject = content.split("\n")[0]; // First line is the subject
      const text = content.split("\n").slice(1).join("\n"); // Rest is the body of the email

      const mailOptions = {
        from: "your-email@gmail.com", // Sender address
        to: email, // Recipient address
        subject, // Subject
        text, // Body of the email
      };

      // Send the email
      const info = await transporter.sendMail(mailOptions);
      console.log(`Email sent to ${email}: ${info.response}`);
      await Campaign.findByIdAndUpdate(campaignId, {
        status: "complete",
      });
    }

    // Send success response
    res.status(200).json({ message: "Emails sent successfully!" });
  } catch (error) {
    console.error("Error sending emails:", error);
    res.status(500).json({ error: "Failed to send emails." });
  }
};

export const gamifiedEmailSending = async (req, res) => {
  const { emails, text, imageUrl, buttonLink, subject } = req.body;
  const { campaignId } = req.params;

  if (!emails || !Array.isArray(emails)) {
    return res.status(400).json({ error: "Invalid email data format." });
  }

  if (!text || typeof text !== "string") {
    return res.status(400).json({ error: "Invalid text format." });
  }

  if (!subject || typeof subject !== "string") {
    return res.status(400).json({ error: "Invalid subject format." });
  }

  if (!imageUrl || typeof imageUrl !== "string") {
    return res.status(400).json({ error: "Invalid image URL format." });
  }

  if (!buttonLink || typeof buttonLink !== "string") {
    return res.status(400).json({ error: "Invalid button link format." });
  }

  try {
    // Define __dirname for ES modules
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    // Load the Handlebars template file
    const templatePath = path.resolve(
      __dirname,
      "../emailTemplate/emailTemplate.hbs"
    );
    const templateSource = await fs.readFile(templatePath, "utf8");
    const template = handlebars.compile(templateSource);

    for (const email of emails) {
      // Generate the email HTML using the template
      const htmlTemplate = template({
        text,
        imageUrl,
        buttonLink,
      });

      const mailOptions = {
        from: "your-email@gmail.com",
        to: email,
        subject: subject,
        html: htmlTemplate,
      };

      const info = await transporter.sendMail(mailOptions);
      console.log(`Email sent to ${email}: ${info.response}`);
      await Campaign.findByIdAndUpdate(campaignId, {
        status: "complete",
      });
    }

    res.status(200).json({ message: "Emails sent successfully!" });
  } catch (error) {
    console.error("Error sending emails:", error);
    res.status(500).json({ error: "Failed to send emails." });
  }
};
