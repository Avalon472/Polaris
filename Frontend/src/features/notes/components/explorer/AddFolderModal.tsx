import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import toast from "react-hot-toast";

interface AddFolderModalProps {
  isOpen: boolean;
  currentLayerFolders: string[];
  onOpenChange: (open: boolean) => void;
  onConfirm: (value: string) => void;
}

const AddFolderModal = ({
  isOpen,
  currentLayerFolders,
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
          <DialogDescription>
            Enter the Name of Your New Folder:
          </DialogDescription>
        </DialogHeader>
        <input
          className={`h-10 text-lg px-2 rounded-md bg-bg3 border border-border outline-none placeholder:text-subtle`}
          placeholder="Folder Name"
          name="folderName"
          type="text"
          onChange={(e) => {
            setFolderName(e.target.value);
          }}
          value={folderName}
        />
        <div className="flex justify-end gap-2">
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
              if (currentLayerFolders.includes(folderName)) {
                toast.error(
                  "Another folder at this level already has that name. Please enter a different name.",
                );
              } else {
                handleConfirm();
              }
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
