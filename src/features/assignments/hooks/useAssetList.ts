import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import type { Asset } from "@/features/asset-management/types/Asset";
import type { AppDispatch, RootState } from "@/store";
import { addAsset } from "@/store/slices/assetSlice";
import { fetchAssetsByParams } from "@/store/thunks/assetThunk";

export function useAssetList(initialAsset: Asset | undefined) {
  const dispatch = useDispatch<AppDispatch>();

  const [selectedAsset, setSelectedAsset] = useState<Asset | undefined>(
    initialAsset,
  );

  const [assetsPage, setAssetsPage] = useState(1);
  const [assetsPageSize, setAssetsPageSize] = useState(20);
  const [assetsSort, setAssetsSort] = useState<{
    id: string;
    desc: boolean;
  } | null>({
    id: "assetName",
    desc: false,
  });
  const [assetsSearchTerm, setAssetsSearchTerm] = useState<string>("");

  const [assetInputOpened, setAssetInputOpened] = useState(false);

  const assetsOrderBy = assetsSort
    ? `${assetsSort.id}${assetsSort.desc ? "desc" : "asc"}`.toLowerCase()
    : "assetnameeasc";

  console.log(assetsOrderBy);

  const isAssetInputOpened = assetInputOpened === true;

  const {
    assets,
    total: totalAssets,
    loading: assetsLoading,
    error: assetsError,
  } = useSelector((state: RootState) => state.assets);

  const fetchAssetData = useCallback(async () => {
    try {
      const response = await dispatch(
        fetchAssetsByParams({
          pageNumber: assetsPage,
          pageSize: assetsPageSize,
          searchTerm: assetsSearchTerm,
          state: "available",
          orderBy: assetsOrderBy,
        }),
      ).unwrap();
      console.info("Users fetched successfully", response);
    } catch (err) {
      console.error("Failed to fetch users:", err);
    }
  }, [dispatch, assetsPage, assetsPageSize, assetsSearchTerm, assetsOrderBy]);

  useEffect(() => {
    if (isAssetInputOpened) {
      (async () => {
        await fetchAssetData();

        // Add the initial Asset to the list (used when editing)
        if (initialAsset) {
          dispatch(addAsset(initialAsset));
        }
      })();
    }
  }, [dispatch, fetchAssetData, initialAsset, isAssetInputOpened]);

  useEffect(() => {
    setSelectedAsset(initialAsset);
  }, [initialAsset]);

  return {
    selectedAsset,
    setSelectedAsset,
    assetsPage,
    setAssetsPage,
    assetsPageSize,
    setAssetsPageSize,
    assetsSort,
    setAssetsSort,
    assetsSearchTerm,
    setAssetsSearchTerm,
    assetInputOpened,
    setAssetInputOpened,
    assetsOrderBy,
    isAssetInputOpened,
    assets,
    totalAssets,
    assetsLoading,
    assetsError,
    fetchAssetData,
  };
}
