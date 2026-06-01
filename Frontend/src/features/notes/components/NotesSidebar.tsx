import { PlusSquare } from "lucide-react";
import Notecard from "./Notecard";
import { noteData } from "./dashboard/PinnedNotesBoard";

const NotesSidebar = () => {
  return (
    <div className="max-w-2xs w-sm h-full bg-bg3 flex p-4 flex-col">
      <div className="w-full h-8 flex justify-between items-center">
        <p>Frameworks</p>
        <button>
          <PlusSquare className="text-subtle hover:text-accent" />
        </button>
      </div>
      <div>
        <Notecard noteContent={noteData} isOnSidebar />
      </div>
    </div>
  );
};

export default NotesSidebar;
