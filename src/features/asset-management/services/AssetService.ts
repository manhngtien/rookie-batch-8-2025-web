import type { Asset } from "@/features/asset-management/types/Asset";
import { API_ROUTES } from "@/lib/apiRoutes";
import apiClient from "@/services/apiClient";

const assetService = {
  getAssets: async (): Promise<{ data: Asset[] }> => {
    const response = await apiClient.get(API_ROUTES.assets.getAssets);
    return response;
  },
};

export default assetService;
