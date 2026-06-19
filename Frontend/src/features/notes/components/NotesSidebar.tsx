import type { NoteListItem } from "@/types/notes";
import { PlusSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Notecard from "./Notecard";

interface SidebarProps {
  notes?: NoteListItem[];
}

const NotesSidebar = ({ notes: noteContents }: SidebarProps) => {
  const navigate = useNavigate();
  return (
    <div className="max-w-2xs w-sm h-full bg-bg3 flex p-2 flex-col border border-border border-l-0">
      <div className="w-full h-8 flex justify-between items-center p-4 mb-2 border-b-2 border-border">
        <p>Frameworks</p>
        <button>
          <PlusSquare
            className="text-subtle hover:text-accent"
            onClick={() => {
              navigate("/notes/new");
            }}
          />
        </button>
      </div>

      {noteContents ? (
        <div className="gap-4 flex flex-col">
          {noteContents.map((note) => {
            return <Notecard key={note._id} noteContent={note} isOnSidebar />;
          })}
        </div>
      ) : (
        <div className="flex items-center justify-center">No notes found</div>
      )}
    </div>
  );
};

export default NotesSidebar;
