import { useQuery } from "@tanstack/react-query";
import { getDrives as fetchDrives } from "@/actions/Drives";

export function useDonationDrivesQuery() {
  return useQuery({
    queryKey: ["donationDrives"],
    queryFn: fetchDrives,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
