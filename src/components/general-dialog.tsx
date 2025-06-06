import type { ReactNode } from "react";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { kebabCase } from "@/lib/utils";

import { Button } from "./ui/button";

export default function GeneralDialog({
  header,
  description,
  content,
  isOpen,
  confirmButtonTitle,
  declineButtonTitle,
  onClose,
  onConfirm,
}: {
  header: string;
  description: string;
  content: ReactNode | undefined;
  confirmButtonTitle?: string;
  declineButtonTitle?: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) {
  return (
    <Dialog open={isOpen}>
      <DialogContent
        className="w-sm max-w-md p-0 text-black"
        isClosable={false}
      >
        <DialogHeader className="w-full rounded-t-lg border-b-1 border-b-gray-400 bg-gray-100 p-4">
          <DialogTitle className="border-red-500 text-red-500">
            {header}
          </DialogTitle>
        </DialogHeader>
        <div className="px-4">
          <p className="text-sm">{description}</p>
          {content}
        </div>
        <DialogFooter className="flex justify-end gap-2 p-4">
          <Button
            id={`${kebabCase(header)}-confirm-button`}
            type="button"
            className="hover:cursor-pointer"
            onClick={onConfirm}
          >
            {confirmButtonTitle ? confirmButtonTitle : "Log out"}
          </Button>
          <Button
            id={`${kebabCase(header)}-cancel-button`}
            type="button"
            variant="secondary"
            className="hover:cursor-pointer"
            onClick={onClose}
          >
            {declineButtonTitle ? declineButtonTitle : "Cancel"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
