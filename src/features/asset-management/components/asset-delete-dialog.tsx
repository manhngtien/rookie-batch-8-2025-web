import { DialogDescription } from "@radix-ui/react-dialog";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "@/components/ui/button";
import {
  DialogChangePassword,
  DialogChangePasswordContent,
  DialogChangePasswordHeader,
  DialogChangePasswordTitle,
} from "@/components/ui/dialog-change-password";
import type { AppDispatch, RootState } from "@/store";
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
  const error = useSelector((state: RootState) => state.assets.error);
  const dispatch = useDispatch<AppDispatch>();

  const handleConfirmDelete = async () => {
    setLoading(true);
    try {
      const result = await dispatch(deleteAssetById(assetCode)).unwrap();
      console.info("Asset deleted:", result);
      onOpenChange(false);
    } catch (err) {
      console.error("Failed to delete asset", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DialogChangePassword open={open} onOpenChange={onOpenChange}>
      <DialogChangePasswordContent className="max-w-2xl p-0 text-black">
        <DialogChangePasswordHeader className="w-full rounded-t-lg border-b-1 border-b-black bg-gray-200 p-4">
          <DialogChangePasswordTitle className="text-foreground my-2 ml-2">
            Confirm Deletion
          </DialogChangePasswordTitle>
        </DialogChangePasswordHeader>
        <DialogDescription className="text-primary px-4 py-2">
          Are you sure?
        </DialogDescription>

        {error && (
          <div className="mx-4 my-2 rounded border border-red-400 bg-red-100 p-3 text-sm text-red-700">
            <strong>Cannot Delete Asset</strong>
            <p>{error}</p>
          </div>
        )}

        <div className="m-4 flex justify-end space-x-4">
          <Button
            id="cancle-delete-asset"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            id="confirm-delete-asset"
            className="bg-red-600 text-white hover:bg-red-700"
            disabled={loading}
            onClick={handleConfirmDelete}
          >
            {loading ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </DialogChangePasswordContent>
    </DialogChangePassword>
  );
}
