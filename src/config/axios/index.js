import axios from "axios";
import { useAuthStore } from "@/stores/auth.js";
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});
axiosInstance.interceptors.request.use((config) => {
  const authStore = useAuthStore();
  config.headers.Authorization = `Bearer ${authStore.getToken}`;
  config.headers.Accept = "application/json";
  return config;
});

export default axiosInstance;
