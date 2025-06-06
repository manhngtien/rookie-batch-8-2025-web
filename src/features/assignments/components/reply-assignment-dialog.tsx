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
import { replyAssignment } from "@/store/thunks/assignmentHomeThunk";

import type { Assignment } from "../types/Assignment";

interface ReplyAssignmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  assignment?: Assignment;
  actionType: "accept" | "decline";
  onReplySuccess?: () => void;
}

export default function ReplyAssignmentDialog({
  open,
  onOpenChange,
  assignment,
  actionType,
  onReplySuccess,
}: ReplyAssignmentDialogProps) {
  const [error, setError] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const handleReply = async () => {
    if (!assignment) return;
    try {
      await dispatch(
        replyAssignment({
          assignmentId: assignment.id,
          isAccepted: actionType === "accept",
        }),
      ).unwrap();
      onOpenChange(false);
      onReplySuccess?.();
      console.log(
        `Assignment ${assignment.id} has been ${actionType}ed successfully.`,
      );
    } catch (err) {
      setError(true);
      console.error(`Failed to ${actionType} assignment:`, err);
    }
  };

  return (
    <DialogChangePassword open={open} onOpenChange={onOpenChange}>
      <DialogChangePasswordContent className="max-w-2xl p-0 text-black">
        <DialogChangePasswordHeader className="w-full rounded-t-lg border-b border-b-gray-400 bg-gray-100 p-4">
          <DialogChangePasswordTitle className="text-foreground my-2 ml-2">
            Are you sure?
          </DialogChangePasswordTitle>
        </DialogChangePasswordHeader>

        <DialogDescription className="text-primary px-4">
          Do you want to {actionType} this assignment
        </DialogDescription>
        {error && (
          <p className="px-4 text-red-600">Failed to process the request.</p>
        )}
        <div className="m-4 flex justify-end space-x-4">
          <Button
            id={`confirm-${actionType}-assignment`}
            className="bg-foreground text-white hover:cursor-pointer"
            disabled={!assignment}
            onClick={handleReply}
          >
            {actionType === "accept" ? "Accept" : "Decline"}
          </Button>
          <Button
            id="cancel-assignment-action"
            variant="outline"
            className="hover:cursor-pointer"
            onClick={() => {
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
