import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const baseUrl = "http://185.231.115.236:3000/api/V1";

const client = axios.create({
    baseURL: baseUrl,
    headers: {
        "Content-Type": "application/json",
    },
});

// تابع خواندن `cookie`
const getCookie = (name: string): string | null => {
    const match = document.cookie.split("; ").find((row) => row.startsWith(name + "="));
    return match ? match.split("=")[1] : null;
};

// اینترسپتور ارسال `accessToken` در همه درخواست‌ها
client.interceptors.request.use(
    (config) => {
        const accessToken = getCookie("accessToken");
        if (accessToken) {
            config.headers["Authorization"] = `Bearer ${accessToken}`;
        }
        // Removed client-side CORS headers.
        return config;
    },
    (error) => Promise.reject(error)
);

// اینترسپتور مدیریت `refreshToken`
client.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            const refreshToken = getCookie("refreshToken");

            if (refreshToken) {
                try {
                    const { data } = await axios.post(`${baseUrl}/auth/refresh`, { refreshToken });
                    document.cookie = `accessToken=${data.accessToken}; path=/`;
                    document.cookie = `refreshToken=${data.refreshToken}; path=/`;
                    error.config.headers["Authorization"] = `Bearer ${data.accessToken}`;
                    return axios(error.config);
                } catch (refreshError) {
                    console.error("Refresh token failed", refreshError);
                    return Promise.reject(refreshError);
                }
            }
        }
        return Promise.reject(error);
    }
);

// تابع درخواست عمومی
const request = async ({ url, ...config }: AxiosRequestConfig): Promise<any | null> => {
    if (!url) {
        throw new Error("URL is required");
    }
    const response = await client.request({ url: encodeURI(url), ...config });
    return response.data;
};

export { baseUrl };
export default request;
