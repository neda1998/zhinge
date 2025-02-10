import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

interface ClientConfig extends Omit<AxiosRequestConfig, 'url'> {
    url: string;
    token?: boolean;
}

const client = async (
    { url, token = true, ...config }: ClientConfig,
    formatter?: (data: any, response: AxiosResponse) => any
): Promise<any | null> => {
    const authToken = axios.defaults.headers.common["Authorization"];
    if (!authToken && token) {
        return null;
    }

    const response = await axios.request({
        url: encodeURI(url),
        ...config,
    });

    return typeof formatter === "undefined" ? response.data : formatter(response.data, response);
};

export default client;
