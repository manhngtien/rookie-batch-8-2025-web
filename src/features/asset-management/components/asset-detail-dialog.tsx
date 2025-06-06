import React from "react";

import { DetailDialog } from "@/components/ui/dashboard-elements";
import {
  type Asset,
  type ELocation,
  LocationLabelMap,
} from "@/features/asset-management/types/Asset";
import { formatDate } from "@/utils/helpers";

interface AssetDetailDialogProps {
  selectedAsset: Asset | null;
  closeModal: () => void;
}

const AssetDetailDialog: React.FC<AssetDetailDialogProps> = ({
  selectedAsset,
  closeModal,
}) => {
  return (
    <DetailDialog<Asset>
      selectedEntity={selectedAsset}
      closeModal={closeModal}
      title="Detailed Asset Information"
    >
      {selectedAsset && (
        <div className="space-y-4 px-8 py-2">
          <div className="grid grid-cols-2 gap-4 text-gray-500">
            <p className="font-medium">Asset Code:</p>
            <p className="text-left">{selectedAsset.assetCode}</p>
            <p className="font-medium">Asset Name:</p>
            <p className="text-left break-words">{selectedAsset.assetName}</p>
            <p className="font-medium">Category:</p>
            <p className="text-left">{selectedAsset.category.categoryName}</p>
            <p className="font-medium">Installed Date:</p>
            <p className="text-left">
              {formatDate(selectedAsset.installedDate)}
            </p>
            <p className="font-medium">State:</p>
            <p className="text-left">{selectedAsset.state}</p>
            <p className="font-medium">Location:</p>
            <p className="text-left">
              {LocationLabelMap[selectedAsset.location as ELocation] ??
                "Unknown"}
            </p>{" "}
            <p className="font-medium">Specification:</p>
            <p className="text-left break-words">
              {selectedAsset.specification}
            </p>
          </div>
          <div>
            <div className="mb-2 flex flex-col items-start gap-5">
              <h1 className="text-gray-500">History:</h1>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="p-2 text-left text-gray-500">Date</th>
                    <th className="p-2 text-left text-gray-500">Assigned to</th>
                    <th className="p-2 text-left text-gray-500">Assigned by</th>
                    <th className="p-2 text-left text-gray-500">Return Date</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedAsset.assignments.length > 0 ? (
                    selectedAsset.assignments.map((assignment, index) => (
                      <tr key={index} className="border-b">
                        <td className="p-2 text-gray-500">
                          {assignment.assignedDate}
                        </td>
                        <td className="p-2 text-gray-500">
                          {assignment.assignedToUser.userName}
                        </td>
                        <td className="p-2 text-gray-500">
                          {assignment.assignedByUser.userName}
                        </td>
                        <td className="p-2 text-gray-500">
                          {assignment.assignedDate
                            ? assignment.assignedDate
                            : "N/A"}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="p-2 text-center">
                        No assignment history
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </DetailDialog>
  );
};

export default AssetDetailDialog;
