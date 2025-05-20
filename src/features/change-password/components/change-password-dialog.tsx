import { DialogDescription } from "@radix-ui/react-dialog";
import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import ChangePasswordForm from "./change-password-form";

interface ChangePasswordDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ChangePasswordDialog({
  open,
  onOpenChange,
}: ChangePasswordDialogProps) {
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);

  // Assume ChangePasswordForm accepts an onSuccess callback prop
  const handlePasswordChangeSuccess = () => {
    setSuccessDialogOpen(true);
  };

  const handleCloseSuccessDialog = () => {
    setSuccessDialogOpen(false);
    onOpenChange(false);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-primary mb-4">
              Change password
            </DialogTitle>
          </DialogHeader>
          <ChangePasswordForm
            onSuccess={handlePasswordChangeSuccess}
            onCancel={() => onOpenChange(false)}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={successDialogOpen} onOpenChange={setSuccessDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-primary">Change password</DialogTitle>
          </DialogHeader>
          <hr className="my-4 border-black" />
          <DialogDescription className="text-primary">
            Your password has been changed successfully!
          </DialogDescription>
          <div className="mt-4 flex justify-end">
            <button
              className="bg-foreground rounded px-4 py-2 text-white"
              onClick={handleCloseSuccessDialog}
            >
              Close
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
