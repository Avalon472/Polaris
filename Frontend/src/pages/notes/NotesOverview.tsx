import LoadingSpinner from "@/components/layout/LoadingSpinner";
import { useGetAllNotes } from "@/features/notes/api/NotesQueries";
import NotesFileExplorer from "@/features/notes/components/dashboard/NotesFileExplorer";
import NotesTabViewer from "@/features/notes/components/dashboard/NotesTabViewer";

const NotesOverview = () => {
  const { data: noteData, isLoading } = useGetAllNotes();
  // const { data: pinnedNotes } = usePinnedNotes();
  // const { data: recentNotes } = useRecentNotes();

  return isLoading ? (
    <LoadingSpinner />
  ) : (
    // TODO: Remove sidebar and board files once tab viewer is complete
    <div className="flex w-full h-full">
      {/* <NotesSidebar notes={noteData} /> */}
      <div className="h-full w-full flex flex-col gap-4 p-4">
        <div className="flex flex-1 gap-4 h-1/2 justify-between">
          {/* <NotesBoard notes={pinnedNotes} boardTitle="Pinned" />
          <NotesBoard notes={recentNotes} boardTitle="Recent" /> */}
          <NotesTabViewer />
        </div>
        <NotesFileExplorer width={50} />
      </div>
    </div>
  );
};

export default NotesOverview;
