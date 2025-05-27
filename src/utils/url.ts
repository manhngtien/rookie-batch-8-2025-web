import type { AssetParams } from "@/features/asset-management/types/AssetParams";

export function buildQueryUrl(baseUrl: string, params?: AssetParams) {
  const searchParams = new URLSearchParams();

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        searchParams.append(key, String(value));
      }
    });
  }

  return `${baseUrl}?${searchParams.toString()}`;
}
