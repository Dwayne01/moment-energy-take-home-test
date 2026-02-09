import { apiHandler } from "@/utils/apiHandler";

export const fetchVoltage = async (after?: string) => {
    let endpoint = "/voltage"; 
    if (after) {
        endpoint += `/search?after=${encodeURIComponent(after)}`;
    }
    return apiHandler("GET", endpoint);
};