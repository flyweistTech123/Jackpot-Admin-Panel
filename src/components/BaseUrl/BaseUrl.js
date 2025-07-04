export const BaseUrl = "https://rizwan-jackpot-backend.vercel.app/api/v1/";

export const getAuthHeaders = () => {
    const token = sessionStorage.getItem("token");
    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
};