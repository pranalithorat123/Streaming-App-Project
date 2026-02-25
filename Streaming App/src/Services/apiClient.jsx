import axios from "axios";
import Cookies from "js-cookie";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const apiClient = axios.create({
  baseURL:  SERVER_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
    }
    return Promise.reject(error);
  }
);
export default apiClient;
