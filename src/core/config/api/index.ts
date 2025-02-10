import axios from "axios";

import { getCookie , setCookie } from "../../../utils/cookie/cookie";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (request:any) => {
    const accessToken = getCookie("accessToken");
    if (accessToken) {
      request.headers["Authorization"] = `bearer ${accessToken}`;
    }
    return request;
  },
  (error:any) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response:any) => {

    return response;
  },
  async (error:any) => {
    const orginialRequest = error.config;
    if (error.response.status === 401 && !orginialRequest._retry) {
      orginialRequest._retry = true;

      const res = await getNewTokens();
      if (res?.response?.status === 201) {
        setCookie("accessToken", res?.response?.data.accessToken, 30);
        setCookie("refreshToken", res?.response?.data.refreshToken, 360);
        return api(orginialRequest);
      } else {
        setCookie("accessToken", "", 0);
        setCookie("refreshToken", "", 0);
      }
    }
    return Promise.reject(error.response.data);
  }
);

export default api;

const getNewTokens = async () => {
  const refreshToken = getCookie("refreshToken");
  if (!refreshToken) return;

  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}auth/refresh-token`, {
      refresh_token: refreshToken,
    });
    return { response };
  } catch (error) {
    return { error };
  }
};
