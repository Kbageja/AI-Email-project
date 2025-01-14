import { useQuery } from "@tanstack/react-query";
import { UserCampaigns } from "./api";

export function getUserCampaigns() {
    return useQuery({
      queryKey: ["Campaigns"],
      queryFn: () => UserCampaigns(),
      staleTime: Infinity,
      gcTime: 10 * 60 * 1000,
    });
  }

  