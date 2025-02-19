import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const baseUrl = "http://185.231.115.236:3000/api/V1";

// تنظیم baseURL برای axios
const client = axios.create({
    baseURL: baseUrl,
});

// تابع کمکی برای خواندن مقدار `cookie`
const getCookie = (name: string): string | null => {
    const match = document.cookie
        .split("; ")
        .find((row) => row.startsWith(name + "="));
    return match ? match.split("=")[1] : null;
};

// اینترسپتور برای ارسال `accessToken` در هدر همه درخواست‌ها
client.interceptors.request.use(
    (config) => {
        const accessToken = getCookie("accessToken");
        if (accessToken) {
            config.headers["Authorization"] = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// اینترسپتور برای مدیریت `refreshToken` در صورت 401
client.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            const refreshToken = getCookie("refreshToken");

            if (refreshToken) {
                try {
                    // ارسال درخواست برای دریافت توکن جدید
                    const { data } = await axios.post(`${baseUrl}/auth/refresh`, {
                        refreshToken,
                    });

                    // ذخیره توکن جدید در کوکی
                    document.cookie = `accessToken=${data.accessToken}; path=/`;
                    document.cookie = `refreshToken=${data.refreshToken}; path=/`;

                    // درخواست قبلی را با توکن جدید ارسال کن
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

interface ClientConfig extends Omit<AxiosRequestConfig, "url"> {
    url: string;
    token?: boolean;
}

const request = async (
    { url, token = true, ...config }: ClientConfig,
    formatter?: (data: any, response: AxiosResponse) => any
): Promise<any | null> => {
    
    const response = await client.request({
        url: encodeURI(url),
        ...config,
    });

    return typeof formatter === "undefined" ? response.data : formatter(response.data, response);
};

export { baseUrl };
export default request;
