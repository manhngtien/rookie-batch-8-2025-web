import { DialogDescription } from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";
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
import { removeAsset } from "@/store/slices/assetSlice";
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
  const [error, setError] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const handleConfirmDelete = async () => {
    try {
      await dispatch(deleteAssetById(assetCode)).unwrap();
      dispatch(removeAsset(assetCode));
      onOpenChange(false);
    } catch (error) {
      console.log("Delete asset fail!", error);
      setError(true);
    }
  };

  useEffect(() => {
    setError(false);
  }, [open]);

  return (
    <DialogChangePassword open={open} onOpenChange={onOpenChange}>
      <DialogChangePasswordContent className="max-w-2xl p-0 text-black">
        <DialogChangePasswordHeader className="w-full rounded-t-lg border-b border-black bg-gray-200 p-4">
          <DialogChangePasswordTitle className="text-foreground my-2 ml-2">
            {error ? "Cannot delete asset" : "Are you sure?"}
          </DialogChangePasswordTitle>
        </DialogChangePasswordHeader>

        <DialogDescription className="text-primary px-4">
          {error ? (
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
            "Do you want to delete this asset?"
          )}
        </DialogDescription>
        <div className="m-4 flex justify-start space-x-4">
          <Button
            id="confirm-delete-asset"
            className="bg-red-600 text-white hover:bg-red-700"
            disabled={error}
            onClick={handleConfirmDelete}
          >
            Delete
          </Button>
          <Button
            id="cancel-delete-asset"
            variant="outline"
            onClick={async () => {
              onOpenChange(false);
              setError(false);
            }}
          >
            Cancel
          </Button>
        </div>
      </DialogChangePasswordContent>
    </DialogChangePassword>
  );
}
