import axios from "axios";
import Cookies from "js-cookie";

const Api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: { "Content-Type": "application/json" },
});

Api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("x-access-token");
    if (token) {
      config.headers["x-access-token"] = token;
    }

    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => Promise.reject(error)
);
Api.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);
export default Api;
