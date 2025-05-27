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
  onClose,
  onConfirm,
}: {
  header: string;
  description: string;
  content: ReactNode | undefined;
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
        <DialogHeader className="w-full rounded-t-lg border-b-1 border-b-black bg-gray-200 p-4">
          <DialogTitle className="border-red-500 pb-2 text-red-500">
            {header}
          </DialogTitle>
        </DialogHeader>
        <p className="text-center text-sm">{description}</p>
        {content}
        <DialogFooter className="mx-auto flex gap-4 p-4">
          <Button
            id={`${kebabCase(header)}-confirm-button`}
            type="button"
            className="hover:cursor-pointer"
            onClick={onConfirm}
          >
            Log out
          </Button>
          <Button
            id={`${kebabCase(header)}-cancel-button`}
            type="button"
            variant="secondary"
            className="hover:cursor-pointer"
            onClick={onClose}
          >
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
