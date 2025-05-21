import axios from "axios";

import store from "@/store";

import { authInterceptor } from "./apiInterceptors";

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
