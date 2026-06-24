import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface DeleteModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  onConfirm: () => void;
}

const DeleteModal = ({
  isOpen,
  onOpenChange,
  title,
  description,
  onConfirm,
}: DeleteModalProps) => {
  const handleConfirm = () => {
    onConfirm();
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <div className="flex justify-end gap-2 pt-4">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              onOpenChange(false);
            }}
            className="buttonCore text-subtle border-subtle hover:border-border-hover"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              handleConfirm();
            }}
            className="buttonCore text-destructive hover:text-destructive border-subtle hover:border-destructive"
          >
            Delete
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteModal;
