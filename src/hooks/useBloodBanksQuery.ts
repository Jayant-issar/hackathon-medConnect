import { useQuery } from "@tanstack/react-query";
import { getBloodBanks as fetchBloodBanks } from "@/actions/bloodbank";

export function useBloodBanksQuery() {
  return useQuery({
    queryKey: ["bloodBanks"],
    queryFn: fetchBloodBanks,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
