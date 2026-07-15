import ItemPagination from "@/components/layout/ItemPagination";
import type { NoteListItem } from "@/types/notes";
import { useMemo, useState } from "react";
import Notecard from "./Notecard";

interface NoteboardProps {
  notes?: NoteListItem[];
  boardTitle: string;
}

const NotesBoard = ({ notes: noteContents, boardTitle }: NoteboardProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const notesPerPage = 8;
  const maxPages = Math.ceil((noteContents?.length ?? 0) / notesPerPage);

  const displayedNotes = useMemo(() => {
    const startIndex = (currentPage - 1) * notesPerPage;
    return noteContents?.slice(startIndex, startIndex + notesPerPage) ?? [];
  }, [currentPage]);

  return (
    <div className="w-1/2 h-full flex flex-col">
      <p className="pl-2 text-subtle">{boardTitle}</p>
      {noteContents ? (
        <>
          <div
            className="size-full bg-bg3 p-4 gap-4 overflow-y-scroll scrollbar-thin rounded-t-2xl grid justify-center"
            style={{
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            }}
          >
            {displayedNotes.map((note) => {
              return <Notecard key={note._id} noteContent={note} />;
            })}
          </div>
          <div className="mt-auto w-full bg-bg3 border-2 border-border rounded-b-2xl">
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
