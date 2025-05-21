import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import type { ReactNode } from "react";

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
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="button">Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
