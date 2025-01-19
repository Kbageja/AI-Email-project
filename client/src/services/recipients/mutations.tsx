import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { createRecipient } from "./api";
import { recipientData } from "@/types/recipient";
import Notify from "@/lib/notify";



export function useRecipentData() {
  return useMutation({
    mutationFn: async ({
      campaignId,
      data,
    }: {
      campaignId: string;
      data: recipientData;
    }) => {
      if (!data.file) {
        throw new Error("File is required to create a campaign.");
      }
      return await createRecipient(campaignId, data);
    },
    onMutate: () => {
      console.log("onMutate: Mutation started.");
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        console.error("onError:", error?.response?.data?.message);
        Notify("error", error?.response?.data?.message);
      } else {
        console.error("onError: An unexpected error occurred.", error);
        Notify("error", "An unexpected error occurred.");
      }
    },
    onSuccess: (response) => {
      console.log("onSuccess: Mutation successful.");
      if (response) {
        Notify("success", response?.message || "Campaign created successfully.");
      }
    },
    onSettled: () => {
      console.log("onSettled: Mutation settled.");
    },
  });
}
