import NotesTabViewer from "@/features/notes/components/dashboard/NotesTabViewer";
import QuickIntake from "@/features/notes/components/dashboard/QuickIntake";
import NotesFileExplorer from "@/features/notes/components/explorer/NotesFileExplorer";

const NotesOverview = () => {
  return (
    <div className="flex flex-col size-full overflow-y-auto scrollbar-gutter-auto scrollbar-thin gap-4 p-4">
      <div className="flex flex-1 gap-4 h-1/2 justify-between">
        <NotesTabViewer />
      </div>
      <div className="flex flex-col-reverse md:flex-row gap-4 h-screen md:h-1/2 shrink-0 md:shrink ">
        <NotesFileExplorer minWidth={40} />
        <QuickIntake />
      </div>
    </div>
  );
};

export default NotesOverview;
