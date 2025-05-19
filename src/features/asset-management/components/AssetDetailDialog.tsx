import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Asset } from "@/features/asset-management/types/Asset";
import type { Assignment } from "@/features/assignments/types/Assignment";
import { DialogClose } from "@radix-ui/react-dialog";

interface AssetDetailDialogProps {
  selectedAsset: Asset | null;
  closeModal: () => void;
}

const AssetDetailDialog: React.FC<AssetDetailDialogProps> = ({
  selectedAsset,
  closeModal,
}) => {
  const getStateLabel = (state: string) => {
    switch (state) {
      case "Available":
        return "Available";
      case "Assigned":
        return "Assigned";
      case "Maintenance":
        return "Maintenance";
      default:
        return state || "Unknown";
    }
  };

  return (
    <Dialog open={!!selectedAsset} onOpenChange={closeModal}>
      <DialogContent className="max-w-md text-black">
        <DialogHeader>
          <DialogTitle>Detailed Asset Information</DialogTitle>
        </DialogHeader>

        {selectedAsset && (
          <div className="space-y-2">
            <p>
              <strong>Asset Code:</strong> {selectedAsset.assetCode}
            </p>
            <p>
              <strong>Asset Name:</strong> {selectedAsset.assetName}
            </p>
            <p>
              <strong>Category:</strong> {selectedAsset.category.categoryName}
            </p>
            <p>
              <strong>Installed Date:</strong>{" "}
              {selectedAsset.installedDate.toLocaleDateString()}
            </p>
            <p>
              <strong>State:</strong> {getStateLabel(selectedAsset.state)}
            </p>
            <p>
              <strong>Location:</strong> {selectedAsset.location}
            </p>
            <p>
              <strong>Specification:</strong> {selectedAsset.specification}
            </p>
            <div>
              <strong>History</strong>
              <table className="mt-2 w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="p-2 text-left">Date</th>
                    <th className="p-2 text-left">Assigned to</th>
                    <th className="p-2 text-left">Assigned by</th>
                    <th className="p-2 text-left">Return Date</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedAsset.assignments.map((assignment, index) => (
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
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AssetDetailDialog;
