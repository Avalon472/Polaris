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
import { useDeleteNote, useUpdateNote } from "../../api/NotesMutations";
import DeleteModal from "../DeleteModal";
import TagList from "./TagList";

interface NotecardProps {
  noteContent: NoteListItem;
  isOnSidebar?: boolean;
}

const Notecard = ({ noteContent, isOnSidebar = false }: NotecardProps) => {
  const deleteNote = useDeleteNote();
  const updateNote = useUpdateNote();
  const navigate = useNavigate();
  const [deleteOpen, setDeleteOpen] = useState(false);

  // Using an IIFE to immediately decide color using the type
  const noteTypeColor = (() => {
    switch (noteContent.type) {
      case "framework":
        return "text-framework";
      case "project-spec":
        return "text-project-spec";
      case "tool":
        return "text-tool";
      case "article":
        return "text-article";
      case "general":
      default:
        return "text-general";
    }
  })();

  const createDescription = () => {
    if (noteContent.body.length < 100) {
      return noteContent.body;
    } else {
      return noteContent.body.slice(0, 100).trimEnd() + "...";
    }
  };
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
            <span className={`text-xs font-medium ${noteTypeColor}`}>
              {noteContent.type}
            </span>

            <div className="flex">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <div className="-m-2 p-2 group cursor-pointer">
                    <EllipsisVertical className="size-4 text-text group-hover:text-accent" />
                  </div>
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
            </p>
          ) : (
            <div className="flex flex-col min-h-0">
              <h2 className="font-semibold text-base leading-tight">
                {noteContent.title}
              </h2>
              <p
                className={`text-sm text-muted leading-relaxed overflow-hidden line-clamp-3`}
              >
                {noteContent.description ?? createDescription()}
              </p>
            </div>
          )}

          <div className="flex mt-auto border-t border-border pt-2 items-center">
            {isOnSidebar && noteContent.tags ? (
              <div className="flex w-[95%]">
                <TagList tags={noteContent.tags} />
              </div>
            ) : (
              <p className="text-xs text-subtle shrink-0">
                Last Edited {noteContent.updatedAt}
              </p>
            )}
            <PinIcon
              className={`ml-auto w-4 h-4 transition-color duration-250 ease-in-out
                ${noteContent.pinned ? "text-success hover:text-destructive" : "text-subtle hover:text-success"}`}
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
