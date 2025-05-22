import type { ReactNode } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
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
}: {
  header: string;
  description: string;
  content: ReactNode | undefined;
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{header}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {content}
        <DialogFooter>
          <Button
            id={`${kebabCase(header)}-cancel-button`}
            type="button"
            variant="secondary"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button id={`${kebabCase(header)}-confirm-button`} type="button">
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
