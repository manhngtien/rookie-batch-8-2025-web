import type {
  Category,
  CategoryAPIResponse,
} from "@/features/asset-management/types/Category";
import { API_ROUTES } from "@/lib/apiRoutes";
import apiClient from "@/services/apiClient";

const categoryService = {
  getCategories: async (): Promise<{ data: Category[] }> => {
    const response = await apiClient.get(API_ROUTES.categories.getCategories);
    const raw = response.data;

    const mapped: Category[] = raw.map((item: CategoryAPIResponse) => ({
      id: item.id ?? null,
      name: item.categoryName,
      prefix: item.prefix,
      total: item.total ?? null,
    }));

    return { data: mapped };
  },
};
export default categoryService;
