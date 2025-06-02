import { createContext, useContext } from "react";

import type { Asset } from "@/features/asset-management/types/Asset";

type AssetDeleteDialogContextType = {
  openAssetDeleteDialog: (asset: Asset) => void;
};

export const AssetDeleteDialogContext =
  createContext<AssetDeleteDialogContextType | null>(null);

export const useAssetDeleteDialog = () => {
  const context = useContext(AssetDeleteDialogContext);
  if (!context) {
    throw new Error(
      "useAssetDeleteDialog must be used within DeleteDialogContext.Provider",
    );
  }
  return context;
};
