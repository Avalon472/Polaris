import ItemPagination from "@/components/layout/ItemPagination";
import LoadingSpinner from "@/components/layout/LoadingSpinner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { type NoteFilter } from "@/types/notes";
import { ChevronDown, Edit, Plus } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useGetAllNotes } from "../../api/NotesQueries";
import EditFilterTabMenu from "../tabViewer/EditFilterTabMenu";
import Notecard from "./Notecard";

interface NotesTabViewerProps {}

interface FilterInstance {
  filterName: string;
  filterCriteria: NoteFilter;
  isEditable: boolean;
}

const NotesTabViewer = ({}: NotesTabViewerProps) => {
  const { data: notes, isLoading } = useGetAllNotes();
  const [filteredNotes, setFilteredNotes] = useState(notes);

  const [filters, setFilters] = useState<FilterInstance[]>([
    {
      filterName: "Recents",
      filterCriteria: {
        newestFirst: true,
        pinned: false,
        types: [],
        tags: [],
      },
      isEditable: false,
    },
    {
      filterName: "Pinned",
      filterCriteria: {
        newestFirst: false,
        pinned: true,
        types: [],
        tags: [],
      },
      isEditable: false,
    },
  ]);

  const [selectedFilter, setSelectedFilter] = useState(filters[0].filterName);

  const applyFilter = (filter: NoteFilter) => {
    let target;

    // Find all notes matching filter options
    target = notes?.filter(
      (note) =>
        (filter.pinned === undefined || note.pinned === filter.pinned) &&
        (filter.types.length === 0 || filter.types.includes(note.type ?? "")) &&
        (filter.tags.length === 0 ||
          filter.tags.every((tag) => note.tags?.includes(tag))) &&
        (filter.updatedWithinDays === undefined ||
          Math.abs(new Date(note.updatedAt).getTime() - new Date().getTime()) <
            filter.updatedWithinDays * 24 * 60 * 60 * 1000),
    );

    // Sort according to updatedAt timestamp
    target = target?.sort((a, b) =>
      filter.newestFirst
        ? new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        : new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime(),
    );

    setFilteredNotes(target);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [notesPerPage, setNotesPerPage] = useState(8);
  const maxPages = Math.ceil((filteredNotes?.length ?? 0) / notesPerPage);

  const displayedNotes = useMemo(() => {
    const startIndex = (currentPage - 1) * notesPerPage;
    return filteredNotes?.slice(startIndex, startIndex + notesPerPage) ?? [];
  }, [currentPage, notesPerPage, filteredNotes]);

  useEffect(() => {
    const filterOptions = filters.find(
      (x) => x.filterName === selectedFilter,
    )!.filterCriteria;
    applyFilter(filterOptions);
  }, [notes, filters]);

  // TODO: Add menu for editing/adding filters
  return isLoading ? (
    <LoadingSpinner />
  ) : (
    <div className="h-full flex flex-col w-full">
      <div className="flex rounded-t-2xl border-2 bg-bg3 border-t border-l-0">
        <div className="flex w-9/10 gap-0.5 h-8 border-b border-b-accent">
          {Object.values(filters).map((filter) => (
            // TODO: change the p tag to be a conditionally active text input for changing filter name
            <div
              className={`flex justify-between px-6 py-0.5 text-text rounded-t-2xl max-w-1/2 min-w-10 w-full items-center transition-all duration-200
            ${filter.filterName === selectedFilter ? "-mt-2 bg-accent" : "border bg-bg2 hover:bg-surface"}`}
              key={filter.filterName}
              onClick={() => {
                setSelectedFilter(filter.filterName);
                const newCriteria = filters.find(
                  (x) => x.filterName === filter.filterName,
                )!.filterCriteria;
                applyFilter(newCriteria);
              }}
            >
              <p>{filter.filterName}</p>

              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Edit className="size-5 text-text hover:opacity-60 cursor-pointer transition-all duration-200" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="-ml-1.5 w-50">
                  <EditFilterTabMenu
                    existingFilter={filter.filterCriteria}
                    handleChange={(newOptions) => {
                      setFilters((prev) =>
                        prev.map((x) =>
                          x.filterName === filter.filterName
                            ? { ...x, filterCriteria: newOptions }
                            : x,
                        ),
                      );
                    }}
                  />
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ))}
        </div>
        <div className="flex w-1/10 justify-center items-center border-b border-b-accent ">
          <button
            className="w-full h-full ml-0.5 text-text rounded-t-2xl cursor-pointer
         hover:text-accent hover:bg-surface transition-all duration-200 flex items-center justify-center"
          >
            <Plus />
          </button>
        </div>
      </div>

      {filteredNotes ? (
        <>
          <div
            className="size-full bg-bg3 p-4 gap-5 overflow-y-scroll scrollbar-thin grid justify-center border border-border border-y-0"
            style={{
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            }}
          >
            {displayedNotes.map((note) => {
              return <Notecard key={note._id} noteContent={note} />;
            })}
          </div>
        </>
      ) : (
        <div className="flex size-full bg-bg3 p-4 border border-border border-y-0 items-center justify-center">
          No notes found
        </div>
      )}
      <div className="mt-auto w-full bg-bg2 border-2 border-border rounded-b-2xl flex justify-between px-4">
        <div className="flex w-3/4 justify-center items-center gap-1">
          <DropdownMenu>
            <DropdownMenuTrigger
              className={`outline-0 flex gap-1 items-center bg-bg3 border border-border px-1 rounded-sm 
                    hover:bg-accent transition-colors duration-200`}
            >
              <p className="text-sm">{notesPerPage}</p>
              <ChevronDown className="size-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="-ml-1.5 min-w-10">
              {[4, 8, 12, 16, 20].map((count) => (
                <DropdownMenuItem
                  key={count}
                  onClick={() => setNotesPerPage(count)}
                  className={`${count === notesPerPage ? "bg-surface border border-accent" : ""}`}
                >
                  <p className="w-full text-center">{count}</p>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <p className="text-sm text-muted px-1 leading-3.5 line-clamp-2">
            per page
          </p>
        </div>
        <ItemPagination
          currentPage={currentPage}
          maxPages={maxPages}
          onSelect={(n) => setCurrentPage(n)}
        />
      </div>
    </div>
  );
};

export default NotesTabViewer;
