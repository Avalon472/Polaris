import type { NoteListItem } from "@/types/notes";
import { PinIcon } from "lucide-react";

interface NotecardProps {
  noteContent: NoteListItem;
  isFavorite?: boolean;
  isOnSidebar?: boolean;
}

const Notecard = ({
  noteContent,
  isFavorite = false,
  isOnSidebar = false,
}: NotecardProps) => {
  return (
    <div
      className={`bg-bg2 border border-border rounded-2xl px-4 py-3 flex flex-col gap-1 text-text min-h-0 overflow-hidden ${isOnSidebar ? "h-24" : "h-42"}`}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-success">
          {noteContent.type}
        </span>
        {isFavorite && (
          <PinIcon className="w-4 h-4 text-subtle hover:text-destructive" />
        )}
      </div>

      <div className="flex flex-col gap-1 flex-1 min-h-0">
        <h2 className="font-semibold text-base leading-tight">
          {noteContent.title}
        </h2>
        <p className="text-sm text-muted leading-relaxed line-clamp-3 overflow-hidden">
          {noteContent.description ?? ""}
        </p>
      </div>

      {isOnSidebar ? null : (
        <p className="border-t border-border pt-2 mt-auto text-xs text-subtle shrink-0">
          Last Edited {noteContent.updatedAt}
        </p>
      )}
    </div>
  );
};

export default Notecard;
