import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { NoteListItem, UpdateNotePayload } from "@/types/notes";
import { EllipsisVertical } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDeleteNote, useUpdateNote } from "../../api/NotesMutations";
import DeleteModal from "../DeleteModal";

interface NoteOptionMenuProps {
  noteContent: NoteListItem;
}

const NoteOptionMenu = ({ noteContent }: NoteOptionMenuProps) => {
  const navigate = useNavigate();

  const deleteNote = useDeleteNote();
  const updateNote = useUpdateNote();

  const [deleteOpen, setDeleteOpen] = useState(false);

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="-m-2.5 p-2.5 group/trigger cursor-pointer">
            <EllipsisVertical className="size-4 text-text group-hover/trigger:text-accent transition-all duration-300" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent onClick={(e) => e.stopPropagation()}>
          <DropdownMenuItem
            onClick={(e) => {
              e.preventDefault();
              navigate(`/notes/${noteContent.slug}`);
            }}
          >
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={(e) => {
              e.preventDefault();
              updateNote.mutate({
                ...(noteContent as UpdateNotePayload),
                pinned: !noteContent.pinned,
              });
            }}
          >
            {noteContent.pinned ? "Unpin" : "Pin"}
          </DropdownMenuItem>
          <DropdownMenuItem
            variant="destructive"
            onClick={(e) => {
              e.preventDefault();
              setDeleteOpen(true);
            }}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DeleteModal
        isOpen={deleteOpen}
        onOpenChange={setDeleteOpen}
        title={`Delete "${noteContent.title}"?`}
        description="This note will be permanently deleted. This action cannot be undone."
        onConfirm={() => {
          deleteNote.mutate(noteContent._id);
        }}
      />
    </div>
  );
};

export default NoteOptionMenu;
