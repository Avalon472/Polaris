import type { NoteListItem, UpdateNotePayload } from "@/types/notes";
import { PinIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { useUpdateNote } from "../../api/NotesMutations";
import NoteOptionMenu from "./NoteOptionMenu";
import TagList from "./TagList";

interface NotecardProps {
  noteContent: NoteListItem;
  filterTags: string[];
}

const Notecard = ({ noteContent, filterTags }: NotecardProps) => {
  const updateNote = useUpdateNote();

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

  return (
    <div>
      <Link to={`/notes/${noteContent.slug}`}>
        <div
          className={`bg-bg2 border border-border rounded-2xl flex flex-col text-text min-h-0 overflow-hidden
            h-40 px-4 py-2 gap-1 hover:shadow hover:-translate-y-1 transition-all duration-400 ease-in-out shadow-accent`}
        >
          <div className="flex items-center justify-between">
            <p className="text-xs text-subtle shrink-0">
              <span className={`text-xs font-medium ${noteTypeColor} mr-2`}>
                {noteContent.type}
              </span>
              Last Edited{" "}
              {new Date(noteContent.updatedAt).toLocaleDateString("en-us")}
            </p>

            <NoteOptionMenu noteContent={noteContent} />
          </div>

          <div className="flex flex-col min-h-0">
            <h2 className="font-semibold text-base leading-tight">
              {noteContent.title}
            </h2>
            <p
              className={`text-sm text-muted leading-relaxed overflow-hidden line-clamp-3`}
            >
              {noteContent.description}
            </p>
          </div>

          <div className="flex mt-auto border-t border-border pt-1 items-center gap-1">
            {noteContent.tags ? (
              <div className="flex w-[95%]">
                <TagList tags={noteContent.tags} filterTags={filterTags} />
              </div>
            ) : (
              <p className="text-xs text-subtle">This note has no tags</p>
            )}
            <PinIcon
              className={`ml-auto size-4 transition-color duration-250 ease-in-out shrink-0
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
    </div>
  );
};

export default Notecard;
