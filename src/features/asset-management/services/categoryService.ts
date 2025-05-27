import type { Category } from "@/features/asset-management/types/Category";
import { API_ROUTES } from "@/lib/apiRoutes";
import apiClient from "@/services/apiClient";

const categoryService = {
  getCategories: async (): Promise<{ data: Category[] }> => {
    const response = await apiClient.get(API_ROUTES.categories.getCategories);
    return response;
  },
};
export default categoryService;
