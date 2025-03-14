import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Emergency } from "@/types/all-types";
import { getUserEmergencyRequests } from "@/actions/seekEmergency";

export function useEmergencyAlerts(userEmail?: string) {
    const queryClient = useQueryClient();

    const { data: emergencies = [], isLoading, isError, error } = useQuery({ // Destructure isError and error
        queryKey: ["emergencies"],
        queryFn: async () => { // Wrap getUserEmergencyRequests in an async function
            const emergencyData = await getUserEmergencyRequests();
            return emergencyData || []; // Return empty array if null is returned
        },
        staleTime: 1000 * 60 * 5, // 5 minutes
    });

    // Filter emergencies based on the selected tab
    const getAllEmergencies = () => {
        return emergencies.sort((a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
    };

    const getMyEmergencies = () => {
        return emergencies.filter(emergency =>
            emergency.contactName === userEmail ||
            emergency.createdBy === userEmail // Keep this for now, adjust if backend changes
        ).sort((a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
    };

    // Optimistically add a new emergency - keep this as is, assuming createEmergencyRequest is used elsewhere to update backend
    const addEmergency = (newEmergency: Emergency) => {
        queryClient.setQueryData(["emergencies"], (old: Emergency[] = []) => [
            newEmergency,
            ...old,
        ]);
    };

    return {
        allEmergencies: getAllEmergencies(),
        myEmergencies: getMyEmergencies(),
        isLoading,
        isError, // Expose isError
        error,     // Expose error
        addEmergency,
    };
}