import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Notify from "@/lib/notify";
import { campaignData } from "@/types/campaign";
import { createCampaign, deleteCampaign, updateCampaign } from "./api";

export function useCreateCampaign() {
    return useMutation({
      mutationFn: (data: campaignData) => createCampaign(data),
      onMutate: () => {
        console.log("onMutate");
      },
      onError: (error) => {
        if (axios.isAxiosError(error)) {
          console.error("onError", error?.response?.data?.message);
          Notify("error", error?.response?.data?.message);
        }
      },
      onSuccess: (response) => {
        console.log("onSuccess");
        if (response) {
          Notify("success", response?.data?.message);
          window.location.href = "/user/dashboard/SendEmail";
        }
      },
      onSettled: () => {
        console.log("on setteled");
      },
    });
  }

  export function useUpdateCampaign() {
    return useMutation({
      mutationFn: ({ campaignId, data }: { campaignId: string; data: campaignData }) => 
        updateCampaign(campaignId, data),
      onMutate: () => {
        console.log("onMutate");
      },
      onError: (error) => {
        if (axios.isAxiosError(error)) {
          console.error("onError", error?.response?.data?.message);
          Notify("error", error?.response?.data?.message);
        }
      },
      onSuccess: (response) => {
        console.log("onSuccess");
        if (response) {
          Notify("success", response?.data?.message);
          window.location.href = "/user/dashboard/SendEmail";
        }
      },
      onSettled: () => {
        console.log("onSettled");
      },
    });
  }
  
  export function useDeleteCampaign() {
    return useMutation({
      mutationFn: (campaignId: string) => deleteCampaign(campaignId),
      onMutate: () => {
        console.log("onMutate");
      },
      onError: (error) => {
        if (axios.isAxiosError(error)) {
          console.error("onError", error?.response?.data?.message);
          Notify("error", error?.response?.data?.message);
        }
      },
      onSuccess: (response) => {
        console.log("onSuccess");
        if (response) {
          Notify("success", response?.data?.message);
          window.location.href = "/user/dashboard/SendEmail";
        }
      },
      onSettled: () => {
        console.log("onSettled");
      },
    });
  }
  