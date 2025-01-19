import { baseapi } from "@/Api"; // Import the base API instance
import { campaignData } from "@/types/campaign";


export const UserCampaigns = () => {
  return baseapi.get("/campaign/getUserCampaigns");
};
export const createCampaign = (data: campaignData) => {
    return baseapi.post("/campaign/create/normal", data);
  };

export const updateCampaign = (campaignId: string, data: campaignData) => {
    return baseapi.put(`/campaign/update/${campaignId}/normal`, data);
  };
export const deleteCampaign = (campaignId: string) => {
    return baseapi.delete(`/campaign/delete/${campaignId}`);
  };
    
  

  