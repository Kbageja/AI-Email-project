import { baseapi } from "@/Api"; // Import the base API instance
import {  genEmail } from "@/types/email";

export const genEmails = (data: genEmail) => {
    return baseapi.post("/emails/generate", data);
  };
