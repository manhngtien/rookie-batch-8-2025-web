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
import type { Assignment } from "@/features/assignments/types/Assignment";
import type { AppDispatch } from "@/store";
import { userReturnRequest } from "@/store/thunks/assignmentHomeThunk";

interface UserReturnRequestDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  assignment?: Assignment;
  onReturnRequest?: () => void;
}

export default function UserReturnRequestDialog({
  open,
  onOpenChange,
  assignment,
  onReturnRequest,
}: UserReturnRequestDialogProps) {
  const [error, setError] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const handleCreateRequest = async () => {
    if (!assignment) return;
    try {
      await dispatch(
        userReturnRequest({
          assignmentId: assignment.id,
        }),
      ).unwrap();
      onOpenChange(false);
      onReturnRequest?.();
      console.log(
        `Request for assignment ${assignment.id} created successfully.`,
      );
    } catch (err) {
      setError(true);
      console.error(`Failed to create request for assignment:`, err);
    }
  };

  return (
    <DialogChangePassword open={open} onOpenChange={onOpenChange}>
      <DialogChangePasswordContent className="max-w-2xl p-0 text-black">
        <DialogChangePasswordHeader className="w-full rounded-t-lg border-b border-black bg-gray-200 p-4">
          <DialogChangePasswordTitle className="text-foreground my-2 ml-2">
            Are you sure?
          </DialogChangePasswordTitle>
        </DialogChangePasswordHeader>

        <DialogDescription className="text-primary px-4">
          Do you want to create a returning request for this asset?
        </DialogDescription>
        {error && (
          <p className="px-4 text-red-600">Failed to process the request.</p>
        )}
        <div className="m-4 flex justify-start space-x-4">
          <Button
            id={`confirm-return-request`}
            className="bg-foreground text-white hover:cursor-pointer"
            disabled={!assignment}
            onClick={handleCreateRequest}
          >
            Yes
          </Button>
          <Button
            id="cancel-return-request"
            variant="outline"
            className="hover:cursor-pointer"
            onClick={() => {
              onOpenChange(false);
              setError(false);
            }}
          >
            No
          </Button>
        </div>
      </DialogChangePasswordContent>
    </DialogChangePassword>
  );
}
