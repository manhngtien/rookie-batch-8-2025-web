import { useState } from "react";
import { useDispatch } from "react-redux";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { AppDispatch } from "@/store";
import { disableUser } from "@/store/thunks/userThunk";

import type { User } from "../../users/types/User";

function DisableUserDialog({
  user,
  open,
  onOpenChange,
}: {
  user: User | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const dispatch = useDispatch<AppDispatch>();
  const [error, setError] = useState<string | null>(null);

  const handleConfirm = async () => {
    if (!user) return;
    try {
      await dispatch(disableUser({ userId: user.staffCode })).unwrap();
      onOpenChange(false);
    } catch (err: unknown) {
      if (err && typeof err === "object" && "code" in err) {
        switch (err.code) {
          case 601:
            setError("User not found.");
            break;
          case 1006:
            setError(
              "There are valid assignments belonging to this user. Please close all assignments before disabling user.",
            );
            break;
          default:
            setError("Failed to disable user. Please try again.");
        }
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setError(null);
    }
    onOpenChange(open);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        className="max-w-md p-0 text-black"
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader className="w-full rounded-t-lg border-b-1 border-b-gray-400 bg-gray-200 p-4">
          <DialogTitle className="text-red-500">
            {error != null ? "Can not disable user" : "Are you sure?"}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 px-8 pb-4">
          <p className="text-sm">
            {error != null ? error : "Do you want to disable this user?"}
          </p>
          {error == null && (
            <div className="flex justify-start gap-2">
              <Button
                id="confirm-disable-button"
                type="button"
                className="bg-red-600 text-white hover:cursor-pointer hover:bg-red-700"
                onClick={handleConfirm}
              >
                Disable
              </Button>
              <Button
                id="cancel-disable-button"
                type="button"
                variant="outline"
                className="hover:cursor-pointer"
                onClick={() => handleOpenChange(false)}
              >
                Cancel
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default DisableUserDialog;
