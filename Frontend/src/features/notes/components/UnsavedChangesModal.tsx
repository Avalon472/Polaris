import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface UnsavedChangesProps {
  onConfirm: () => void;
  onCancel: () => void;
  displayText?: string;
}

const UnsavedChangesModal = ({
  onConfirm,
  onCancel,
  displayText,
}: UnsavedChangesProps) => {
  const defaultDescription =
    "You have unsaved changes. Leaving this page will revert those changes. Please ensure you have saved your progress before proceeding.";
  return (
    <Dialog open={true}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Warning!</DialogTitle>
          <DialogDescription>
            <p>
              {displayText !== undefined ? displayText : defaultDescription}
            </p>
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              onCancel();
            }}
            className="buttonCore text-subtle border-subtle hover:border-border-hover"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              onConfirm();
            }}
            className="buttonCore text-destructive hover:text-destructive border-subtle hover:border-destructive"
          >
            Proceed
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UnsavedChangesModal;
