import _axios from "axios";
import { baseUrl } from "../../helpers/utils/constants";

const headers = { "Content-Type": "application/json" };

const axios = _axios.create({
    headers,
    baseURL: baseUrl
});

axios.interceptors.request.use(
    function (config) {
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

export default axios;