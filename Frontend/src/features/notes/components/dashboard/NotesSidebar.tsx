import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { NoteType, type NoteListItem } from "@/types/notes";
import { ChevronDown, PlusSquare } from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Notecard from "./Notecard";

interface SidebarProps {
  notes?: NoteListItem[];
}

const NotesSidebar = ({ notes: noteContents }: SidebarProps) => {
  const navigate = useNavigate();
  const [filterType, setFilterType] = useState("recent");
  const [isOpen, setIsOpen] = useState(false);
  const filterOptions = ["recent", ...Object.values(NoteType)];

  const filteredNotes = useMemo(() => {
    if (!noteContents) return [];

    switch (filterType) {
      case "recent":
        return [...noteContents]
          .sort(
            (a, b) =>
              new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
          )
          .slice(0, 10);
      case NoteType.FRAMEWORK:
      case NoteType.TOOL:
      case NoteType.GENERAL:
      case NoteType.PROJECT_SPEC:
      case NoteType.ARTICLE:
        return noteContents.filter((note) => note.type === filterType);
      default:
        return noteContents;
    }
  }, [noteContents, filterType]);

  const filterCounts = useMemo(() => {
    if (!noteContents) return {} as Record<string, number>;

    return {
      all: noteContents.length,
      pinned: noteContents.filter((note) => note.pinned).length,
      recent: Math.min(noteContents.length, 10),
      [NoteType.FRAMEWORK]: noteContents.filter(
        (note) => note.type === NoteType.FRAMEWORK,
      ).length,
      [NoteType.TOOL]: noteContents.filter(
        (note) => note.type === NoteType.TOOL,
      ).length,
      [NoteType.GENERAL]: noteContents.filter(
        (note) => note.type === NoteType.GENERAL,
      ).length,
      [NoteType.PROJECT_SPEC]: noteContents.filter(
        (note) => note.type === NoteType.PROJECT_SPEC,
      ).length,
      [NoteType.ARTICLE]: noteContents.filter(
        (note) => note.type === NoteType.ARTICLE,
      ).length,
    };
  }, [noteContents]);
  return (
    <div className="max-w-2xs w-sm h-full bg-bg3 flex p-2 flex-col border border-border border-l-0">
      <div className="w-full h-8 flex justify-between items-center p-2 mb-2 border-b-2 border-border">
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
          <DropdownMenuTrigger
            className={`w-32 outline-0 flex gap-2 items-center duration-200 transition-colors
            ${isOpen ? "text-accent hover:text-text" : "text-text hover:text-accent"}`}
          >
            {filterType[0].toUpperCase() + filterType.slice(1)}
            <ChevronDown className="size-6" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="-ml-1.5">
            {filterOptions.map((type) => (
              <DropdownMenuItem onClick={() => setFilterType(type)}>
                <div className="flex w-full justify-between">
                  <p>{type[0].toUpperCase() + type.slice(1)}</p>{" "}
                  <p className="text-accent">{filterCounts[type]}</p>
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <button>
          <PlusSquare
            className="text-text hover:text-accent duration-200 transition-colors"
            onClick={() => {
              navigate("/notes/new");
            }}
          />
        </button>
      </div>

      {filteredNotes ? (
        <div className="gap-4 flex flex-col overflow-y-auto scrollbar-thin">
          {filteredNotes.map((note) => {
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
