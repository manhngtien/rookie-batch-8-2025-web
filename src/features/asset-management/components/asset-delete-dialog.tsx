import { DialogDescription } from "@radix-ui/react-dialog";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router";

import { Button } from "@/components/ui/button";
import {
  DialogChangePassword,
  DialogChangePasswordContent,
  DialogChangePasswordHeader,
  DialogChangePasswordTitle,
} from "@/components/ui/dialog-change-password";
import type { AppDispatch } from "@/store";
import { deleteAssetById } from "@/store/thunks/assetThunk";

interface AssetDeleteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  assetCode: string;
}

export default function AssetDeleteDialog({
  open,
  onOpenChange,
  assetCode,
}: AssetDeleteDialogProps) {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const handleConfirmDelete = async () => {
    setLoading(true);
    try {
      await dispatch(deleteAssetById(assetCode)).unwrap();
    } catch (error) {
      console.log("Change password failed!", error);
      setLoading(true);
    }
  };

  const handleDialogOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      setLoading(false); // Reset loading whenever dialog closes
    }
    onOpenChange(isOpen); // Call parent-provided function
  };

  return (
    <DialogChangePassword open={open} onOpenChange={handleDialogOpenChange}>
      <DialogChangePasswordContent className="max-w-2xl p-0 text-black">
        <DialogChangePasswordHeader className="w-full rounded-t-lg border-b border-black bg-gray-200 p-4">
          <DialogChangePasswordTitle className="text-foreground my-2 ml-2">
            {loading ? "Cannot delete asset" : "Are you sure?"}
          </DialogChangePasswordTitle>
        </DialogChangePasswordHeader>

        <DialogDescription className="text-primary px-4 py-2">
          {loading ? (
            <>
              Cannot delete asset because it belongs to one or more historical
              assignments.
              <br />
              If the asset is no longer usable, please update its state in the{" "}
              <Link
                to={`/assets/edit-asset/${assetCode}`}
                className="text-blue-600 underline hover:text-blue-800"
              >
                Edit asset page
              </Link>
              .
            </>
          ) : (
            "Are you sure?"
          )}
        </DialogDescription>
        <div className="m-4 flex justify-end space-x-4">
          <Button
            id="cancel-delete-asset"
            variant="outline"
            onClick={async () => {
              onOpenChange(false);
              setLoading(false);
            }}
          >
            Cancel
          </Button>
          <Button
            id="confirm-delete-asset"
            className="bg-red-600 text-white hover:bg-red-700"
            disabled={loading}
            onClick={handleConfirmDelete}
          >
            Delete
          </Button>
        </div>
      </DialogChangePasswordContent>
    </DialogChangePassword>
  );
}
