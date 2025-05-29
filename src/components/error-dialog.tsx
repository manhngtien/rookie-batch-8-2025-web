import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ErrorDialogProps {
  errorMessage: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function ErrorDialog({ errorMessage, open, onOpenChange }: ErrorDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-md p-0 text-black"
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader className="w-full rounded-t-lg border-b-1 border-b-gray-400 bg-gray-200 p-4">
          <DialogTitle className="text-red-500">Error</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 px-8 pb-4">
          <p className="text-sm">{errorMessage}</p>
          <div className="flex justify-end">
            <Button
              id="error-dialog-ok-button"
              type="button"
              className="bg-red-600 text-white hover:cursor-pointer hover:bg-red-700"
              onClick={() => onOpenChange(false)}
            >
              OK
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ErrorDialog;
