import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { NoteListItem, UpdateNotePayload } from "@/types/notes";
import { EllipsisVertical, PinIcon } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDeleteNote, useUpdateNote } from "../api/NotesMutations";
import DeleteModal from "./DeleteModal";

interface NotecardProps {
  noteContent: NoteListItem;
  isOnSidebar?: boolean;
}

const Notecard = ({ noteContent, isOnSidebar = false }: NotecardProps) => {
  const deleteNote = useDeleteNote();
  const updateNote = useUpdateNote();
  const navigate = useNavigate();
  const [deleteOpen, setDeleteOpen] = useState(false);

  return (
    <div>
      <Link to={`/notes/${noteContent.slug}`}>
        <div
          className={`bg-bg2 border border-border rounded-2xl flex flex-col text-text min-h-0 overflow-hidden ${
            isOnSidebar
              ? "h-26 p-2 hover:outline"
              : "h-42 px-4 py-3 gap-1 hover:shadow hover:-translate-y-1 transition-all duration-400 ease-in-out shadow-accent"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-success">
              {noteContent.type}
            </span>

            <div className="flex">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <button className="-m-2 p-2 group cursor-pointer">
                    <EllipsisVertical className="size-4 text-text group-hover:text-accent" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
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
            </div>
          </div>

          {isOnSidebar ? (
            <p
              className={`text-sm text-muted leading-4 overflow-hidden line-clamp-2`}
            >
              <span className="font-bold text-base text-text">
                {noteContent.title}
              </span>
              {noteContent.description}
            </p>
          ) : (
            <div className="flex flex-col min-h-0">
              <h2 className="font-semibold text-base leading-tight">
                {noteContent.title}
              </h2>
              <p
                className={`text-sm text-muted leading-relaxed overflow-hidden line-clamp-3`}
              >
                {noteContent.description ?? ""}
              </p>
            </div>
          )}

          <div className="flex mt-auto border-t border-border pt-2">
            {isOnSidebar && noteContent.tags ? (
              <>
                {noteContent.tags.map((tag) => (
                  <p
                    key={tag}
                    className="hover:text-accent text-subtle text-xs border border-subtle hover:border-accent hover: px-1.5 py-0.5
               rounded-xl transition-color duration-250 ease-in-out whitespace-nowrap shrink-0
               scrollbar-invisible overflow-x-scroll"
                  >
                    {tag}
                  </p>
                ))}
              </>
            ) : (
              <p className="text-xs text-subtle shrink-0">
                Last Edited {noteContent.updatedAt}
              </p>
            )}
            <PinIcon
              className={`ml-auto w-4 h-4 ${noteContent.pinned ? "text-success hover:text-destructive" : "text-subtle hover:text-success"} transition-color duration-250 ease-in-out`}
              onClick={(e) => {
                e.preventDefault();
                updateNote.mutate({
                  ...(noteContent as UpdateNotePayload),
                  pinned: !noteContent.pinned,
                });
              }}
            />
          </div>
        </div>
      </Link>

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

export default Notecard;
