import { ChevronDown, CircleX, Pencil } from "lucide-react";
import React from "react";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Asset } from "@/features/asset-management/types/Asset";

import AssetDetailDialog from "./asset-detail-dialog";
import { assets } from "./fake-asset";

const AssetDataTable = () => {
  const itemsPerPage = 10;
  const [currentPage] = React.useState(1);
  const [selectedAsset, setSelectedAsset] = React.useState<Asset | null>(null);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentAssets = assets.slice(indexOfFirstItem, indexOfLastItem);

  const handleRowClick = (asset: Asset) => {
    setSelectedAsset(asset);
  };

  const closeModal = () => {
    setSelectedAsset(null);
  };

  const handleEditClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    console.log("Edit button clicked");
  };

  const handleDeleteClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    console.log("Delete button clicked");
  };

  return (
    <div className="overflow-x-auto">
      <Table className="text-black">
        <TableHeader>
          <TableRow className="border-b-white bg-gray-100">
            <TableHead className="border p-2 text-left text-black">
              Asset Code
            </TableHead>
            <TableHead className="border p-2 text-left text-black">
              <div className="flex items-center gap-2 p-2">
                Asset Name
                <span>
                  <ChevronDown size={20} />
                </span>
              </div>
            </TableHead>
            <TableHead className="border p-2 text-left text-black">
              <div className="flex items-center gap-2 p-2">
                Category
                <span>
                  <ChevronDown size={20} />
                </span>
              </div>
            </TableHead>
            <TableHead className="border p-2 text-left text-black">
              <div className="flex items-center gap-2 p-2">
                State
                <span>
                  <ChevronDown size={20} />
                </span>
              </div>
            </TableHead>
            <TableHead className="bg-white p-2"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentAssets.map((asset) => (
            <TableRow
              className="group border-none hover:cursor-pointer hover:bg-transparent"
              key={asset.assetCode}
              onClick={() => handleRowClick(asset)}
            >
              <TableCell className="group-hover:bg-muted/50 border p-4">
                {asset.assetCode}
              </TableCell>
              <TableCell className="group-hover:bg-muted/50 border p-4">
                {asset.assetName}
              </TableCell>
              <TableCell className="group-hover:bg-muted/50 border p-4">
                {asset.category.categoryName}
              </TableCell>
              <TableCell className="group-hover:bg-muted/50 border p-4">
                {asset.state}
              </TableCell>
              <TableCell className="p-4 group-hover:bg-transparent">
                <div className="flex gap-4">
                  <button
                    className="duration-200 hover:scale-120 hover:cursor-pointer"
                    onClick={handleEditClick}
                  >
                    <Pencil size={20} />
                  </button>
                  <button
                    className="duration-200 hover:scale-120 hover:cursor-pointer"
                    onClick={handleDeleteClick}
                  >
                    <CircleX size={20} />
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination className="mt-4 flex justify-end text-black">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>

      <AssetDetailDialog
        selectedAsset={selectedAsset}
        closeModal={closeModal}
      />
    </div>
  );
};

export default AssetDataTable;
