import NotesBoard from "@/features/notes/components/dashboard/NotesBoard";
import NotesSidebar from "@/features/notes/components/NotesSidebar";
import { noteDataLong, noteDataShort } from "./testData";

const NotesOverview = () => {
  return (
    <div className="flex w-full h-full">
      <NotesSidebar />
      <div className="h-full w-full flex flex-col gap-4 p-4">
        <div className="flex gap-4 h-1/2 justify-between">
          <NotesBoard notes={noteDataLong} boardTitle="Pinned" />
          <NotesBoard notes={noteDataShort} boardTitle="Recent" />
        </div>
        {/* Newspanel */}
        <div className="h-1/2 bg-accent w-full" />
      </div>
    </div>
  );
};

export default NotesOverview;
