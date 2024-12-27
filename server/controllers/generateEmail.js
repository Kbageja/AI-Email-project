import { OpenAI } from "openai"; // Import OpenAI from the new SDK
import axios from "axios"; // Axios for making HTTP requests
import NodeCache from "node-cache"; // In-memory cache (replacing Redis)

// OpenAI Configuration
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Ensure your API key is set in the environment
});

// Axios Instance for external API calls
const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api", // Replace with your API's base URL
  timeout: 5000, // Optional: set a timeout
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
