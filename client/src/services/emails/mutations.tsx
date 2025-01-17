import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import axios from "axios";
import Notify from "@/lib/notify";
import { genEmail } from "@/types/email"; // Ensure genEmail type matches recipient data structure
import { genEmails } from "./api";
 // Assuming this is where `genEmails` is exported

 export function usegenEmail(config?: UseMutationOptions<any, any, genEmail>) {
  return useMutation({
    mutationFn: async (data: genEmail) => {
      if (!data.recipients || data.recipients.length === 0) {
        throw new Error("Recipients data is required to generate emails.");
      }
      return await genEmails(data); // Call the `genEmails` function
    },
    onMutate: () => {
      console.log("onMutate: Mutation started.");
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        console.error("onError:", error?.response?.data?.message);
        Notify("error", error?.response?.data?.message || "Failed to generate emails.");
      } else {
        console.error("onError: An unexpected error occurred.", error);
        Notify("error", "An unexpected error occurred.");
      }
    },
    onSuccess: (response) => {
      console.log("onSuccess: Mutation successful. " + JSON.stringify(response));
      Notify("success", "Emails generated successfully.");
    },
    onSettled: () => {
      console.log("onSettled: Mutation settled.");
    },
  });
}

