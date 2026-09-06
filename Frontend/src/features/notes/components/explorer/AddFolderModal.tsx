import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";

interface AddFolderModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (value: string) => void;
}

const AddFolderModal = ({
  isOpen,
  onOpenChange,
  onConfirm,
}: AddFolderModalProps) => {
  const handleConfirm = () => {
    onConfirm(folderName);
    onOpenChange(false);
    setFolderName("");
  };
  const [folderName, setFolderName] = useState("");

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Folder</DialogTitle>

          <input
            className={`bg-bg3 border border-border outline-none placeholder:text-subtle`}
            placeholder="Folder Name"
            name="folderName"
            type="text"
            onChange={(e) => {
              setFolderName(e.target.value);
            }}
            value={folderName}
          />
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
            className="buttonCore text-success hover:text-success border-subtle hover:border-success"
          >
            Create
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddFolderModal;
