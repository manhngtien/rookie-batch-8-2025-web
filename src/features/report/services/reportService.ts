import type { Report } from "@/features/report/types/Report";
import { API_ROUTES } from "@/lib/apiRoutes";
import apiClient from "@/services/apiClient";

export const reportService = {
  getReports: async ({ orderBy }: { orderBy: string }) => {
    const queryParams = new URLSearchParams({
      OrderBy: orderBy,
    });

    const response = await apiClient.get<Report[]>(
      `${API_ROUTES.reports.getReports}?${queryParams.toString()}`,
    );

    return response;
  },

  exportReport: async () => {
    const response = await apiClient.get(
      `${API_ROUTES.reports.exportReports}`,
      { responseType: "blob" },
    );

    return response;
  },
};
