import { useQuery } from "@tanstack/react-query";
import { getHospitals as fetchHospitals } from "@/actions/hospitals";

export function useHospitalsQuery() {
  return useQuery({
    queryKey: ["hospitals"],
    queryFn: fetchHospitals,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
