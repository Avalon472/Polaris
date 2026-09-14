import LoadingSpinner from "@/components/layout/LoadingSpinner";
import ViewPlaceholder from "@/components/layout/ViewPlaceholder";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  useGetAllNotes,
  usePinnedNotes,
  useRecentNotes,
} from "@/features/notes/api/NotesQueries";
import NotesBoard from "@/features/notes/components/dashboard/NotesBoard";
import NotesFileExplorer from "@/features/notes/components/dashboard/NotesFileExplorer";
import { NotePanelType } from "@/types/notes";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const HomePage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notePanelOption, setNotePanelOption] = useState(NotePanelType.PINNED);
  const { isLoading } = useGetAllNotes();

  const notePanelContent = (() => {
    switch (notePanelOption) {
      case NotePanelType.RECENT:
        const { data: recentNotes } = useRecentNotes();
        return (
          <NotesBoard notes={recentNotes} width={100} boardTitle="Recent" />
        );
      case NotePanelType.EXPLORER:
        return <NotesFileExplorer />;
      case NotePanelType.PINNED:
        const { data: pinnedNotes } = usePinnedNotes();
        return (
          <NotesBoard notes={pinnedNotes} width={100} boardTitle="Pinned" />
        );
    }
  })();
  return (
    <div className="h-full w-full gap-4 flex flex-col justify-center p-4">
      {/* recent notes */}
      <div className="flex flex-col gap-4 h-1/2 relative">
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
          <DropdownMenuTrigger
            className={`w-32 outline-0 flex gap-2 justify-end duration-200 transition-colors absolute right-0
            ${isOpen ? "text-accent hover:text-text" : "text-text hover:text-accent"}`}
          >
            {notePanelOption[0].toUpperCase() + notePanelOption.slice(1)}
            <ChevronDown className="size-6" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="-ml-1.5">
            {Object.values(NotePanelType).map((type) => (
              <DropdownMenuItem
                key={type}
                onClick={() => setNotePanelOption(type)}
              >
                <div className="flex w-full justify-between">
                  <p>{type[0].toUpperCase() + type.slice(1)}</p>
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        {isLoading ? <LoadingSpinner /> : notePanelContent}
      </div>
      {/* <ViewPlaceholder text="Notes Dashboard" /> */}
      {/* projects (skeleton) */}
      <ViewPlaceholder text="Projects Dashboard" />
    </div>
  );
};

export default HomePage;
