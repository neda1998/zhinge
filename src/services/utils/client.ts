import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

let inDevEnvironment = process.env.NODE_ENV === "development";
const baseUrl = "http://185.231.115.236:3000";

// تنظیم baseURL برای axios
axios.defaults.baseURL = baseUrl;

interface ClientConfig extends Omit<AxiosRequestConfig, 'url'> {
    url: string;
    token?: boolean;
}

const client = async (
    { url, token = true, ...config }: ClientConfig,
    formatter?: (data: any, response: AxiosResponse) => any
): Promise<any | null> => {
    
    const authToken = axios.defaults.headers.common["Authorization"] || "";
    console.log("Auth Token:", authToken);

    const response = await axios.request({
        url: encodeURI(url),
        ...config,
    });

    return typeof formatter === "undefined" ? response.data : formatter(response.data, response);
};

export { inDevEnvironment, baseUrl };
export default client;
