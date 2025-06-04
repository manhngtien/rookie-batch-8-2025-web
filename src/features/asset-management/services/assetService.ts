import type {
  Asset,
  AssetUpdate,
  PaginationHeader,
} from "@/features/asset-management/types/Asset";
import type { AssetParams } from "@/features/asset-management/types/AssetParams";
import { API_ROUTES } from "@/lib/apiRoutes";
import apiClient from "@/services/apiClient";

const assetService = {
  getAssets: async (): Promise<{ data: Asset[] }> => {
    const response = await apiClient.get(API_ROUTES.assets.getAssets);
    return response;
  },

  getAssetsByParams: async (
    params: AssetParams,
  ): Promise<{ data: Asset[]; total: number }> => {
    const url = API_ROUTES.assets.getAssetsByParams(params);
    const response = await apiClient.get(url);
    const paginationHeader = response.headers["pagination"];
    const pagination: PaginationHeader = JSON.parse(paginationHeader);
    return { data: response.data, total: pagination.totalCount };
  },

  getAssetByCode: async (assetCode: string): Promise<{ data: Asset }> => {
    const response = await apiClient.get(
      API_ROUTES.assets.getAssetByCode(assetCode),
    );

    const apiAsset = response.data;

    const mappedAsset: Asset = {
      ...apiAsset,
      category: {
        id: apiAsset.category.id,
        prefix: apiAsset.category.prefix,
        categoryName: apiAsset.category.categoryName,
        total: apiAsset.category.total,
      },
      installedDate: new Date(apiAsset.installedDate).toLocaleDateString(
        "sv-SE",
      ),
    };

    return { data: mappedAsset };
  },

  createAsset: async (formData: FormData): Promise<{ data: Asset }> => {
    const response = await apiClient.post(
      API_ROUTES.assets.createAsset,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data", // Important: Let the browser set the proper multipart boundary
        },
      },
    );
    return response;
  },

  updateAsset: async (
    assetCode: string,
    assetUpdate: AssetUpdate,
  ): Promise<{ data: Asset }> => {
    const response = await apiClient.put(
      API_ROUTES.assets.updateAsset(assetCode),
      assetUpdate,
    );
    return response;
  },

  deleteAsset: async (assetCode: string): Promise<{ data: string }> => {
    const response = await apiClient.delete(
      API_ROUTES.assets.deleteAsset(assetCode),
    );
    return response;
  },
};

export default assetService;
