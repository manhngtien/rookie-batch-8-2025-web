import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface CancleRequestDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  returningRequestId: number;
}

export default function CancleRequestDialog({
  open,
  onOpenChange,
}: CancleRequestDialogProps) {
  const handleConfirmCancelRequest = async () => {
    try {
      onOpenChange(false);
    } catch (error) {
      console.log("Delete asset fail!", error);
    }
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl p-0 text-black">
        <DialogHeader className="w-full rounded-t-lg border-b border-black bg-gray-200 p-4">
          <DialogTitle className="text-foreground my-2 ml-2">
            Are you sure?
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-primary px-4">
          Do you want to cancle this returning request?
        </DialogDescription>
        <div className="m-4 flex justify-start space-x-4">
          <Button
            id="confirm-cancel-request"
            className="bg-red-600 text-white hover:bg-red-700"
          >
            Yes
          </Button>
          <Button
            id="deny-cancle-request"
            variant="outline"
            onClick={async () => {
              onOpenChange(false);
              handleConfirmCancelRequest();
            }}
          >
            No
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
