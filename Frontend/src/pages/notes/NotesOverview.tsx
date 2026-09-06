import LoadingSpinner from "@/components/layout/LoadingSpinner";
import {
  useGetAllNotes,
  usePinnedNotes,
  useRecentNotes,
} from "@/features/notes/api/NotesQueries";
import NotesBoard from "@/features/notes/components/dashboard/NotesBoard";
import NotesFileExplorer from "@/features/notes/components/dashboard/NotesFileExplorer";
import NotesSidebar from "@/features/notes/components/dashboard/NotesSidebar";

const NotesOverview = () => {
  const { data: noteData, isLoading } = useGetAllNotes();
  const { data: pinnedNotes } = usePinnedNotes();
  const { data: recentNotes } = useRecentNotes();

  return isLoading ? (
    <LoadingSpinner />
  ) : (
    <div className="flex w-full h-full">
      <NotesSidebar notes={noteData} />
      <div className="h-full w-full flex flex-col gap-4 p-4">
        <div className="flex flex-1 gap-4 h-1/2 justify-between">
          <NotesBoard notes={pinnedNotes} boardTitle="Pinned" />
          <NotesBoard notes={recentNotes} boardTitle="Recent" />
        </div>
        <NotesFileExplorer />
      </div>
    </div>
  );
};

export default NotesOverview;
