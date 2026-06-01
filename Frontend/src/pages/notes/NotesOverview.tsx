import PinnedNotesBoard from "@/features/notes/components/dashboard/PinnedNotesBoard";
import NotesSidebar from "@/features/notes/components/NotesSidebar";

const NotesOverview = () => {
  return (
    <div className="flex w-full h-full">
      <NotesSidebar />
      <div className="h-full w-full gap-4 flex flex-col justify-center p-8">
        <PinnedNotesBoard />
        <div className="h-1/2 bg-accent w-full"></div>
      </div>
    </div>
  );
  //Pinned section at top
  //Searchbar plus category options below
};

export default NotesOverview;
