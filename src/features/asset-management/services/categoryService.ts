import type { Category } from "@/features/asset-management/types/Category";
import { API_ROUTES } from "@/lib/apiRoutes";
import apiClient from "@/services/apiClient";

const categoryService = {
  getCategories: async (): Promise<{ data: Category[] }> => {
    const response = await apiClient.get(API_ROUTES.categories.getCategories);
    return { data: response.data };
  },

  createCategories: async (formData: FormData): Promise<{ data: Category }> => {
    const response = await apiClient.post(
      API_ROUTES.categories.createCategories,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data", // Important: Let the browser set the proper multipart boundary
        },
      },
    );
    return response;
  },
};
export default categoryService;
