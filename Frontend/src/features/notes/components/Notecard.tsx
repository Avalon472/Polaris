import type { NoteListItem } from "@/types/notes";
import { PinIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface NotecardProps {
  noteContent: NoteListItem;
  isOnSidebar?: boolean;
}

const Notecard = ({ noteContent, isOnSidebar = false }: NotecardProps) => {
  return (
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

          <PinIcon
            className={`w-4 h-4 ${noteContent.pinned ? "text-success hover:text-destructive" : "text-subtle hover:text-accent"} transition-color duration-250 ease-in-out`}
            onClick={(e) => {
              e.preventDefault();
              console.log("Pinned ", noteContent.title);
            }}
          />
        </div>

        {isOnSidebar ? (
          <p
            className={`text-sm text-muted leading-4 overflow-hidden line-clamp-2`}
          >
            <span className="font-bold text-base text-text">
              {noteContent.title}
            </span>{" "}
            - {noteContent.description}
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

        {isOnSidebar ? (
          <div className="flex mt-auto border-t border-border gap-1 pt-1 overflow-x-scroll scrollbar-invisible">
            {noteContent.tags.map((tag) => (
              <p
                key={tag}
                className="hover:text-accent text-subtle text-xs border border-subtle hover:border-accent hover: px-1.5 py-0.5
               rounded-xl transition-color duration-250 ease-in-out whitespace-nowrap shrink-0"
              >
                {tag}
              </p>
            ))}
          </div>
        ) : (
          <p className="border-t border-border pt-2 mt-auto text-xs text-subtle shrink-0">
            Last Edited {noteContent.updatedAt}
          </p>
        )}
      </div>
    </Link>
  );
};

export default Notecard;
