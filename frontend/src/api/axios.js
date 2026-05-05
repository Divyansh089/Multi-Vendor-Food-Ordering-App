import axios from "axios";

const api = axios.create({
  baseURL: typeof window !== "undefined" && window.localStorage.getItem("API_URL")
    ? window.localStorage.getItem("API_URL")
    : "http://localhost:8081/api",
  timeout: 15000,
});

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = window.localStorage.getItem("cravely_token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (r) => r,
  (err) => {
    if (err?.response?.status === 401 && typeof window !== "undefined") {
      window.localStorage.removeItem("cravely_token");
    }
    return Promise.reject(err);
  }
);

export default api;
