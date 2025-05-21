import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
export default function ReturnConfirmPopup({
  confirmDialogOpen,
  setConfirmDialogOpen,
}: {
  confirmDialogOpen: boolean;
  setConfirmDialogOpen: () => void;
}) {
  return (
    <Dialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Confirm Return</DialogTitle>
          <DialogDescription>
            Are you sure you want to confirm the returning request as
            "Completed"
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            type="button"
            variant="secondary"
            onClick={setConfirmDialogOpen}
          >
            Cancel
          </Button>
          <Button type="button">Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
