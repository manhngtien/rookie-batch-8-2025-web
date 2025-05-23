import { DialogDescription } from "@radix-ui/react-dialog";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { Button } from "@/components/ui/button";
import {
  DialogChangePassword,
  DialogChangePasswordContent,
  DialogChangePasswordHeader,
  DialogChangePasswordTitle,
} from "@/components/ui/dialog-change-password";
import type { AppDispatch } from "@/store";
import { changePassword } from "@/store/slices/authSlice";

import ChangePasswordForm, {
  type ChangePasswordFormValues,
} from "./change-password-form";

interface ChangePasswordDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ChangePasswordDialog({
  open,
  onOpenChange,
}: ChangePasswordDialogProps) {
  const [loading, setLoading] = useState(false);
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = async (values: ChangePasswordFormValues) => {
    setLoading(true);
    try {
      const result = await dispatch(
        changePassword({
          oldPassword: values.oldPassword,
          newPassword: values.newPassword,
        }),
      );

      if (changePassword.fulfilled.match(result)) {
        openDialogChangeSuccess();
      } else {
        console.error("Password change failed:", result.payload);
      }
    } catch (error) {
      console.error("Change password failed:", error);
    }
  };

  const openDialogChangeSuccess = () => {
    setSuccessDialogOpen(true);
  };

  const handleCloseSuccessDialog = () => {
    setSuccessDialogOpen(false);
    onOpenChange(false);
  };

  return (
    <>
      <DialogChangePassword open={open} onOpenChange={onOpenChange}>
        <DialogChangePasswordContent className="max-w-2xl p-0 text-black">
          <DialogChangePasswordHeader className="w-full rounded-t-lg border-b-1 border-b-black bg-gray-200 p-4">
            <DialogChangePasswordTitle className="text-foreground my-2 ml-2">
              Change password
            </DialogChangePasswordTitle>
          </DialogChangePasswordHeader>
          <div className="m-6">
            <ChangePasswordForm
              onSubmit={handleSubmit}
              onCancel={() => onOpenChange(false)}
              loading={loading}
            />
          </div>
        </DialogChangePasswordContent>
      </DialogChangePassword>

      <DialogChangePassword
        open={successDialogOpen}
        onOpenChange={setSuccessDialogOpen}
      >
        <DialogChangePasswordContent className="max-w-2xl p-0 text-black">
          <DialogChangePasswordHeader className="w-full rounded-t-lg border-b-1 border-b-black bg-gray-200 p-4">
            <DialogChangePasswordTitle className="text-foreground my-2 ml-2">
              Change password
            </DialogChangePasswordTitle>
          </DialogChangePasswordHeader>
          <DialogDescription className="text-primary px-4">
            Your password has been changed successfully!
          </DialogDescription>
          <div className="mr-6 mb-4 flex justify-end">
            <Button
              id="close-password-change-success"
              className="p-5"
              type="button"
              onClick={handleCloseSuccessDialog}
            >
              Close
            </Button>
          </div>
        </DialogChangePasswordContent>
      </DialogChangePassword>
    </>
  );
}
