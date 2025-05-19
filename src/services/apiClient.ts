import axios from "axios";
import { authInterceptor } from "./apiInterceptors";
import store from "@/store";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

authInterceptor(apiClient, store.dispatch);

export default apiClient;
