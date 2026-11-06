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
    "You have unsaved changes. Are you sure you want to leave this page?";
  return (
    <Dialog open={true}>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Warning!</DialogTitle>
          <DialogDescription>
            {displayText !== undefined ? displayText : defaultDescription}
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
