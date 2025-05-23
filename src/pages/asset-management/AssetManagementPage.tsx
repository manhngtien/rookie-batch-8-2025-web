import { Funnel, Search } from "lucide-react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTable } from "@/components/ui/data-table";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { assetColumns } from "@/features/asset-management/components/asset-columns";
import AssetDetailDialog from "@/features/asset-management/components/asset-detail-dialog";
import type { Asset } from "@/features/asset-management/types/Asset";
import type { AppDispatch, RootState } from "@/store";
import { fetchAssets } from "@/store/thunks/assetThunk";

function AssetManagementPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { assets, loading, error } = useSelector(
    (state: RootState) => state.assets,
  );
  const [selectedAsset, setSelectedAsset] = React.useState<Asset | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchAssets());
  }, [dispatch]);

  const handleRowClick = (asset: Asset) => {
    setSelectedAsset(asset);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold">Asset List</h1>
      <div className="mb-4 flex gap-5 space-x-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="asset-state-dropdown"
              variant="outline"
              className="w-[15rem] justify-between text-black hover:cursor-pointer"
            >
              State
              <span>
                <Funnel color="black" />
              </span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[15rem] p-2">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="all" checked={true} onCheckedChange={() => {}} />
                <label htmlFor="all">All</label>
              </div>
            </div>
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="category-filter-dropdown"
              variant="outline"
              className="w-[15rem] justify-between text-black hover:cursor-pointer"
            >
              Category
              <span>
                <Funnel color="black" />
              </span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[15rem] p-2">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="all" checked={true} onCheckedChange={() => {}} />
                <label htmlFor="all">All</label>
              </div>
            </div>
          </PopoverContent>
        </Popover>

        <div className="relative w-[20rem]">
          <Input
            id="asset-assignment-search-bar"
            className=""
            placeholder="Search..."
          />
          <Search className="pointer-events-none absolute top-2.5 right-2.5 h-4 w-4 opacity-50" />
        </div>
        <Button
          id="create-asset-button"
          onClick={() => {
            navigate("/assets/create-asset");
          }}
          className="bg-red-600 text-white hover:cursor-pointer hover:bg-red-700"
        >
          Create new asset
        </Button>
      </div>

      {loading && <p>Loading assets...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      {!loading && !error && (
        <DataTable
          columns={assetColumns}
          data={assets}
          handleRowClick={(asset) => handleRowClick(asset)}
        />
      )}

      {selectedAsset && (
        <AssetDetailDialog
          selectedAsset={selectedAsset}
          closeModal={() => setSelectedAsset(null)}
        />
      )}
    </div>
  );
}

export default AssetManagementPage;
