import type {
  Asset,
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

  getAssetbyCode: async (assetCode: string): Promise<{ data: Asset }> => {
    const response = await apiClient.get(
      API_ROUTES.assets.getAssetByCode(assetCode),
    );
    return response;
  },

  createAsset: async (asset: Asset): Promise<{ data: string }> => {
    const response = await apiClient.post(API_ROUTES.assets.createAsset, asset);
    return response;
  },

  updateAsset: async (
    assetId: string,
    asset: Asset,
  ): Promise<{ data: string }> => {
    const response = await apiClient.put(
      API_ROUTES.assets.updateAsset(assetId),
      asset,
    );
    return response;
  },

  deleteAsset: async (assetId: string): Promise<{ data: string }> => {
    const response = await apiClient.delete(
      API_ROUTES.assets.deleteAsset(assetId),
    );
    return response;
  },
};

export default assetService;
