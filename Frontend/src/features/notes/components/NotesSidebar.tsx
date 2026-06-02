import { noteDataShort } from "@/pages/notes/testData";
import { PlusSquare } from "lucide-react";
import Notecard from "./Notecard";

const NotesSidebar = () => {
  return (
    <div className="max-w-2xs w-sm h-full bg-bg3 flex p-2 flex-col border border-border border-l-0">
      <div className="w-full h-8 flex justify-between items-center p-4 mb-2 border-b-2 border-border">
        <p>Frameworks</p>
        <button>
          <PlusSquare className="text-subtle hover:text-accent" />
        </button>
      </div>
      <div>
        <Notecard noteContent={noteDataShort[0]} isOnSidebar />
      </div>
    </div>
  );
};

export default NotesSidebar;
