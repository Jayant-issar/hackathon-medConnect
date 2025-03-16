import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Emergency } from "@/types/all-types";
import { getUserEmergencyRequests } from "@/actions/seekEmergency";
import { useOnboarding } from "./useOnboarding";

export function useEmergencyAlerts() {
    const queryClient = useQueryClient();
    const {data:onboardingData} = useOnboarding();
    const { data: emergencies = [], isLoading, isError, error,refetch } = useQuery({ 
        queryKey: ["emergencies"],
        queryFn: async () => { // Wrap getUserEmergencyRequests in an async function
            const emergencyData = await getUserEmergencyRequests();
            return emergencyData || []; // Return empty array if null is returned
        },
        staleTime: 1000 * 60 * 5, // 5 minutes
    });

    // Filter emergencies based on the selected tab
    const getAllEmergencies = () => {
        return emergencies
        // .sort((a, b) =>
        //     new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        // );
    };

    
    const addEmergency = (newEmergency: Emergency) => {
        queryClient.setQueryData(["emergencies"], (old: Emergency[] = []) => [
            newEmergency,
            ...old,
        ]);
    };

    return {
        allEmergencies: getAllEmergencies(),
        isLoading,
        isError, // Expose isError
        error,     // Expose error
        addEmergency,
        refetch
    };
}