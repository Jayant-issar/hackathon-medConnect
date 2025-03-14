import { useQuery } from '@tanstack/react-query';
import { onBoardUser } from '../actions/user'; 
import { useClerk } from '@clerk/clerk-react';

export const useOnboarding = () => {
    const { user } = useClerk();

    const onboardingQuery = useQuery({
        queryKey: ['onboardUser'], // Unique key for the query
        queryFn: async () => {
            if (!user) {
                return null; 
            }
            const userData = {
                email: user.emailAddresses[0].emailAddress, // Assuming primary email
                clerkId: user.id,
                name: `${user.firstName} ${user.lastName}`, 
            };
            const response = await onBoardUser(userData);

            if (response?.response && (response.response.status === 200 || response.response.status === 201)) {
                return response.response.data; 
            } else {
                
                throw new Error(response?.error?.message || "Onboarding failed");
            }
        },
        enabled: !!user, // Only run the query if user is available
        retry: false, // Do not retry automatically, 
    });

    return onboardingQuery;
}; 