import { Emergency } from "@/types/all-types";
import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL;
const API_TIMEOUT = 10000;

export async function getUserEmergencyRequests(): Promise<Emergency[] | null> {
    try {
        const response = await axios.get(`${API_URL}/emergencies`, {
            timeout: API_TIMEOUT,
        });

        if (response.status === 200) {
            return response.data as Emergency[]; 
        } else {
            console.error("Failed to fetch emergency requests, status code:", response.status);
            return null;
        }
    } catch (error) {
        const errorMessage = axios.isAxiosError(error)
            ? error.response?.data?.message || error.message
            : "Failed to fetch emergency requests";

        console.error("Error fetching emergency requests:", errorMessage, error);
        return null;
    }
}

export async function createEmergencyRequest(emergency: Omit<Emergency, "id" | "status" | "createdAt" | "createdBy" | "bloodType" | "urgency" | "additionalInfo"> & { userId: string,name: string, urgencyLevel: string,description: string }): Promise<Emergency | null> {
    try {
        const response = await axios({
            method: "POST",
            url: `${API_URL}/emergencies`,
            data: emergency,
            timeout: API_TIMEOUT,
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.status === 201) {
            return response.data as Emergency; // Assuming the API returns the created emergency
        } else {
            console.error("Failed to create emergency request, status code:", response.status);
            return null;
        }
    } catch (error) {
        const errorMessage = axios.isAxiosError(error)
            ? error.response?.data?.message || error.message
            : "Failed to create emergency request";

        console.error("Error creating emergency request:", errorMessage, error);
        return null;
    }
}
