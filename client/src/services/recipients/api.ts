import { baseapi } from "@/Api"; // Import the base API instance
import { recipientData } from "@/types/recipient";




export const createRecipient = async (campaignId: string, data: recipientData) => {
  if (!data.file) {
    throw new Error("File is required");
  }

  const formData = new FormData();
  formData.append("file", data.file);

  try {
    const response = await baseapi.post(`/recipient/extract/${campaignId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating campaign:", error);
    throw error;
  }
};
