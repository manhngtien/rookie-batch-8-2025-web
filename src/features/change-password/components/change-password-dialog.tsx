import React, { useState } from "react";
import {
  DialogChangePassword,
  DialogChangePasswordContent,
  DialogChangePasswordHeader,
  DialogChangePasswordTitle,
} from "@/components/ui/dialog-change-password";

import ChangePasswordForm from "./change-password-form";
import { DialogDescription } from "@radix-ui/react-dialog";

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
      <DialogChangePassword open={open} onOpenChange={onOpenChange}>
        <DialogChangePasswordContent>
          <DialogChangePasswordHeader>
            <DialogChangePasswordTitle className="text-foreground mb-4">
              Change password
            </DialogChangePasswordTitle>
          </DialogChangePasswordHeader>
          <ChangePasswordForm
            onSuccess={handlePasswordChangeSuccess}
            onCancel={() => onOpenChange(false)}
          />
          {/* <ResetPasswordPreview/> */}
        </DialogChangePasswordContent>
      </DialogChangePassword>

      <DialogChangePassword
        open={successDialogOpen}
        onOpenChange={setSuccessDialogOpen}
      >
        <DialogChangePasswordContent>
          <DialogChangePasswordHeader>
            <DialogChangePasswordTitle className="text-primary">
              Change password
            </DialogChangePasswordTitle>
          </DialogChangePasswordHeader>
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
        </DialogChangePasswordContent>
      </DialogChangePassword>
    </>
  );
}
