import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Asset } from "@/features/asset-management/types/Asset";

interface AssetDetailDialogProps {
  selectedAsset: Asset | null;
  closeModal: () => void;
}

const AssetDetailDialog: React.FC<AssetDetailDialogProps> = ({
  selectedAsset,
  closeModal,
}) => {
  return (
    <Dialog open={!!selectedAsset} onOpenChange={closeModal}>
      <DialogContent className="max-w-2xl p-0 text-black">
        <DialogHeader className="w-full rounded-t-lg border-b-1 border-b-black bg-gray-200 p-4">
          <DialogTitle className="border-red-500 pb-2 text-red-500">
            Detailed Asset Information
          </DialogTitle>
        </DialogHeader>

        {selectedAsset && (
          <div className="space-y-4 px-8 py-2">
            <div className="grid grid-cols-2 gap-4 text-gray-500">
              <p className="font-medium">Asset Code:</p>
              <p className="text-left">{selectedAsset.assetCode}</p>
              <p className="font-medium">Asset Name:</p>
              <p className="text-left">{selectedAsset.assetName}</p>
              <p className="font-medium">Category:</p>
              <p className="text-left">{selectedAsset.category.categoryName}</p>
              <p className="font-medium">Installed Date:</p>
              <p className="text-left">
                {selectedAsset.installedDate.toLocaleDateString()}
              </p>

              <p className="font-medium">State:</p>
              <p className="text-left">{selectedAsset.state}</p>
              <p className="font-medium">Location:</p>
              <p className="text-left">{selectedAsset.location}</p>
              <p className="font-medium">Specification:</p>
              <p className="text-left">{selectedAsset.specification}</p>
            </div>
            <div>
              <div className="mb-2 flex flex-col items-start gap-5">
                <h1 className="text-gray-500">History:</h1>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="p-2 text-left text-gray-500">Date</th>
                      <th className="p-2 text-left text-gray-500">
                        Assigned to
                      </th>
                      <th className="p-2 text-left text-gray-500">
                        Assigned by
                      </th>
                      <th className="p-2 text-left text-gray-500">
                        Return Date
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedAsset.assignments.length > 0 ? (
                      selectedAsset.assignments.map((assignment, index) => (
                        <tr key={index} className="border-b">
                          <td className="p-2">
                            {assignment.stateDate.toLocaleDateString()}
                          </td>
                          <td className="p-2">{assignment.assignedTo}</td>
                          <td className="p-2">{assignment.assignedBy}</td>
                          <td className="p-2">
                            {assignment.returnDate
                              ? assignment.returnDate.toLocaleDateString()
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
      </DialogContent>
    </Dialog>
  );
};

export default AssetDetailDialog;
