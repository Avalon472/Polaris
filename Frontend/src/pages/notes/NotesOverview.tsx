import NotesTabViewer from "@/features/notes/components/dashboard/NotesTabViewer";
import QuickIntake from "@/features/notes/components/dashboard/QuickIntake";
import NotesFileExplorer from "@/features/notes/components/explorer/NotesFileExplorer";

const NotesOverview = () => {
  // const { data: noteData, isLoading } = useGetAllNotes();
  // const { data: pinnedNotes } = usePinnedNotes();
  // const { data: recentNotes } = useRecentNotes();

  return (
    // TODO: Remove sidebar and board files once tab viewer is complete
    <div className="flex w-full h-full overflow-y-auto scrollbar-gutter-auto scrollbar-thin">
      {/* <NotesSidebar notes={noteData} /> */}
      <div className="h-full w-full flex flex-col gap-4 p-4">
        <div className="flex flex-1 gap-4 h-1/2 justify-between">
          {/* <NotesBoard notes={pinnedNotes} boardTitle="Pinned" />
          <NotesBoard notes={recentNotes} boardTitle="Recent" /> */}
          <NotesTabViewer />
        </div>
        <div className="flex flex-col-reverse md:flex-row gap-4 h-screen md:h-1/2 shrink-0 md:shrink ">
          <NotesFileExplorer minWidth={40} />
          <QuickIntake />
        </div>
      </div>
    </div>
  );
};

export default NotesOverview;
