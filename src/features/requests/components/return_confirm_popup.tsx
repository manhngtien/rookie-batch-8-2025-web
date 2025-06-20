import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
export default function ReturnConfirmPopup({
  confirmDialogOpen,
  setConfirmDialogOpen,
}: {
  confirmDialogOpen: boolean;
  setConfirmDialogOpen: () => void;
}) {
  return (
    // TODO: Xài cái GeneralDialog đê
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
          {/* eslint-disable-next-line custom/require-id-on-important-elements */}
          <Button
            type="button"
            variant="secondary"
            onClick={setConfirmDialogOpen}
          >
            Cancel
          </Button>
          {/* eslint-disable-next-line custom/require-id-on-important-elements */}
          <Button type="button">Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
