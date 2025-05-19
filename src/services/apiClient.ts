import axios from "axios";
import { authInterceptor } from "./apiInterceptors";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

authInterceptor(apiClient);

export default apiClient;
