import ItemPagination from "@/components/layout/ItemPagination";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { type NoteListItem } from "@/types/notes";
import { ChevronDown } from "lucide-react";
import { useMemo, useState } from "react";
import Notecard from "./Notecard";

interface NoteboardProps {
  notes?: NoteListItem[];
  width?: number;
  boardTitle: string;
}

const NotesBoard = ({
  notes: noteContents,
  width = 50,
  boardTitle,
}: NoteboardProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [notesPerPage, setNotesPerPage] = useState(8);
  const maxPages = Math.ceil((noteContents?.length ?? 0) / notesPerPage);

  const displayedNotes = useMemo(() => {
    const startIndex = (currentPage - 1) * notesPerPage;
    return noteContents?.slice(startIndex, startIndex + notesPerPage) ?? [];
  }, [currentPage, notesPerPage, noteContents]);

  return (
    <div className="h-full flex flex-col" style={{ width: `${width}%` }}>
      <p className="px-6 py-0.5 text-text bg-bg2 rounded-t-2xl border-2 border-b-0">
        {boardTitle}
      </p>
      {noteContents ? (
        <>
          <div
            className="size-full bg-bg3 p-4 gap-6 overflow-y-scroll scrollbar-thin grid justify-center border border-border border-b-0"
            style={{
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            }}
          >
            {displayedNotes.map((note) => {
              return <Notecard key={note._id} noteContent={note} />;
            })}
          </div>
          <div className="mt-auto w-full bg-bg2 border-2 border-border rounded-b-2xl flex justify-between px-4">
            <div className="flex w-3/4 justify-center items-center gap-1">
              <DropdownMenu>
                <DropdownMenuTrigger
                  className={`outline-0 flex gap-1 items-center bg-bg3 border border-border px-1 rounded-sm 
                    hover:bg-accent transition-colors duration-200`}
                >
                  <p className="text-sm">{notesPerPage}</p>
                  <ChevronDown className="size-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="-ml-1.5 min-w-10">
                  {[4, 8, 12, 16, 20].map((count) => (
                    <DropdownMenuItem
                      key={count}
                      onClick={() => setNotesPerPage(count)}
                      className={`${count === notesPerPage ? "bg-surface border border-accent" : ""}`}
                    >
                      <p className="w-full text-center">{count}</p>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <p className="text-sm text-muted px-1 leading-3.5 line-clamp-2">
                per page
              </p>
            </div>
            <ItemPagination
              currentPage={currentPage}
              maxPages={maxPages}
              onSelect={(n) => setCurrentPage(n)}
            />
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center">No notes found</div>
      )}
    </div>
  );
};

export default NotesBoard;
