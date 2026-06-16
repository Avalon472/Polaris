import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import type { NoteListItem } from "@/types/notes";
import Notecard from "../Notecard";

interface NoteboardProps {
  notes?: NoteListItem[];
  boardTitle: string;
}

const NotesBoard = ({ notes: noteContents, boardTitle }: NoteboardProps) => {
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
            {noteContents.map((note) => {
              return <Notecard key={note._id} noteContent={note} />;
            })}
          </div>
          <div className="mt-auto w-full bg-bg3 border-2 border-border rounded-b-2xl">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>
                    1
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center">No notes found</div>
      )}
    </div>
  );
};

export default NotesBoard;
