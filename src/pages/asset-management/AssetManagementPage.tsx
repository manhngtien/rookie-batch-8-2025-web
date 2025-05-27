import { Funnel, Search } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { PageTitle } from "@/components/ui/dashboard-elements";
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
import { fetchAssetsByParams } from "@/store/thunks/assetThunk";

function AssetManagementPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { assets, total, loading, error } = useSelector(
    (state: RootState) => state.assets,
  );

  const allStates = [
    "All",
    "Available",
    "Not_Available",
    "Assigned",
    "Waiting_For_Recycling",
    "Recycled",
  ];

  const allCategories = ["Electronics", "Furniture"];

  const [selectedStates, setSelectedStates] = useState<string[]>(["All"]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedAsset, setSelectedAsset] = React.useState<Asset | null>(null);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(20);

  const navigate = useNavigate();

  const [sort, setSort] = useState<{ id: string; desc: boolean } | null>({
    id: "assetCode",
    desc: false,
  });
  const orderBy = sort
    ? `${sort.id}${sort.desc ? "desc" : "asc"}`.toLowerCase()
    : "assetcodeasc";

  const initialState = useMemo(
    () => ({
      sorting: sort ? [sort] : [{ id: "assetCode", desc: false }],
      pagination: {
        pageIndex: page - 1,
        pageSize,
      },
    }),
    [sort, page, pageSize],
  );

  function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      return () => {
        clearTimeout(handler);
      };
    }, [value, delay]);

    return debouncedValue;
  }

  useEffect(() => {
    const fetchAssetsData = async () => {
      try {
        const response = await dispatch(
          fetchAssetsByParams({
            orderBy,
            searchTerm: debouncedSearchTerm,
            category: selectedCategory,
            state:
              selectedStates.length > 0 && !selectedStates.includes("All")
                ? selectedStates.join(",")
                : undefined,
            pageNumber: page,
            pageSize,
          }),
        ).unwrap();
        console.info("Users fetched successfully", response);
      } catch (err) {
        console.error("Failed to fetch users:", err);
      }
    };

    fetchAssetsData();
  }, [
    dispatch,
    page,
    pageSize,
    debouncedSearchTerm,
    orderBy,
    selectedCategory,
    selectedStates,
  ]);

  const handleRowClick = (asset: Asset) => {
    setSelectedAsset(asset);
  };

  const handleStateToggle = (state: string) => {
    setSelectedStates((prev) => {
      if (state === "All") {
        return ["All"];
      }
      const newSelected = prev.includes(state)
        ? prev.filter((s) => s !== state)
        : [...prev.filter((s) => s !== "All"), state];
      console.log("New selected states:", newSelected);
      return newSelected;
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <PageTitle>Asset List</PageTitle>
      <div className="flex gap-5 space-x-4">
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
              {allStates.map((state) => (
                <div key={state} className="flex items-center space-x-2">
                  <Checkbox
                    id={state}
                    checked={selectedStates.includes(state)}
                    onCheckedChange={() => handleStateToggle(state)}
                  />
                  <label htmlFor={state}>{state}</label>
                </div>
              ))}
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
              {allCategories.map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox
                    id={category}
                    checked={selectedCategory === category}
                    onCheckedChange={() => setSelectedCategory(category)}
                  />
                  <label htmlFor={category}>{category}</label>
                </div>
              ))}
            </div>
          </PopoverContent>
        </Popover>

        <div className="relative w-[20rem]">
          <Input
            id="asset-assignment-search-bar"
            className=""
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(1);
            }}
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

      {error && <p className="text-red-500">Error: {error}</p>}

      {!error && (
        <DataTable
          columns={assetColumns}
          data={assets}
          total={total}
          loading={loading}
          handleRowClick={(asset) => handleRowClick(asset)}
          initialState={initialState}
          onPageChange={(pageIndex) => setPage(pageIndex + 1)}
          onSortingChange={(sort) => {
            setSort(sort);
            setPage(1);
          }}
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
