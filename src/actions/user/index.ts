import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const API_TIMEOUT = 10000;

type userDataType = {
    email: string;
    clerkId: string;
    name: string;
    bloodType?: string | undefined;
    role?: "USER" | "ADMIN" | undefined;
}

type ApiResponse<T> = {
  data?: T;
  error?: {
    code: string;
    message: string;
  };
};

export async function onBoardUser(
    data: userDataType
) {
    try {
        const response = await axios({
            method: "POST",
            url: `${API_URL}/users/onboard`,
            data,
            timeout: API_TIMEOUT,
            headers: {
                "Content-Type": "application/json"
            }
        })
        return {response:response}
    } catch (error) {
        const errorMessage = axios.isAxiosError(error)
         ? error.response?.data?.message || error.message : "Failed to onboard/checkonboarding of user";

        console.error("Onboarding Error", {
            error: errorMessage,
            user:data
        });
    }
    return {
        error:{
            code:"ONBOARDING_ERROR",
            message:"Failed to onboard/checkonboarding of user"
        }
    }

}