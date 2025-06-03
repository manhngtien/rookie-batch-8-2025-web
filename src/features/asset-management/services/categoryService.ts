import type {
  Category,
  CreateCategoryRequest,
} from "@/features/asset-management/types/Category";
import { API_ROUTES } from "@/lib/apiRoutes";
import apiClient from "@/services/apiClient";

const categoryService = {
  getCategories: async (): Promise<{ data: Category[] }> => {
    const response = await apiClient.get(API_ROUTES.categories.getCategories);
    return { data: response.data };
  },

  createCategories: async (
    category: CreateCategoryRequest,
  ): Promise<{ data: Category }> => {
    const formData = new FormData();
    formData.append("categoryName", category.categoryName);
    formData.append("prefix", category.prefix);

    const response = await apiClient.post(
      API_ROUTES.categories.createCategories,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return response;
  },
};
export default categoryService;
