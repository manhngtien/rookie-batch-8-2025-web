import { API_ROUTES } from "@/lib/apiRoutes";
import apiClient from "@/services/apiClient";

import type Request from "../types/Request";

const requestService = {
  getRequests: async (): Promise<{ data: Request[] }> => {
    const response = await apiClient.get(API_ROUTES.requests.getRequests);
    return response;
  },
};

export default requestService;
