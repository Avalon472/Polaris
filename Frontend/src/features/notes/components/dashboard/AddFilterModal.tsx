import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { FilterInstance } from "@/types/notes";
import { useState } from "react";
import EditFilterTabMenu from "../tabViewer/EditFilterTabMenu";

interface AddFilterModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (value: FilterInstance) => void;
}

const AddFilterModal = ({
  isOpen,
  onOpenChange,
  onConfirm,
}: AddFilterModalProps) => {
  const basicFilter = {
    filterName: "",
    filterCriteria: {
      pinned: false,
      tags: [],
      types: [],
      newestFirst: true,
    },
    isEditable: true,
  };

  const handleConfirm = () => {
    onConfirm(newFilter);
    onOpenChange(false);
    setNewFilter({ ...basicFilter });
  };
  const [newFilter, setNewFilter] = useState<FilterInstance>({
    ...basicFilter,
  });

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Folder</DialogTitle>
          <DialogDescription>
            Enter the Name of Your New Folder:
          </DialogDescription>
        </DialogHeader>
        <form
          id="filterNameForm"
          onSubmit={(e) => {
            e.preventDefault();
            handleConfirm();
          }}
        >
          <input
            className={`h-10 w-full text-lg px-2 rounded-md bg-bg3 border border-border outline-none placeholder:text-subtle`}
            placeholder="Folder Name"
            name="folderName"
            type="text"
            onChange={(e) => {
              setNewFilter((prev) => ({ ...prev, filterName: e.target.value }));
            }}
            value={newFilter.filterName}
          />
        </form>
        <EditFilterTabMenu
          existingFilter={newFilter.filterCriteria}
          handleChange={(newSettings) =>
            setNewFilter((prev) => ({ ...prev, filterCriteria: newSettings }))
          }
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
            type="submit"
            form="filterNameForm"
            className="buttonCore text-success hover:text-success border-subtle hover:border-success"
          >
            Create
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddFilterModal;
