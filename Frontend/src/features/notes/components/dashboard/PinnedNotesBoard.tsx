import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Notecard from "../Notecard";

const PinnedNotesBoard = () => {
  return (
    <div className="relative w-full h-1/2 flex flex-col">
      <div
        className="size-full bg-bg3 p-4 gap-4 overflow-y-scroll scrollbar-thin rounded-t-2xl grid"
        style={{ gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}
      >
        {/* flex flex-wrap */}

        <Notecard />
        <Notecard />
        <Notecard />
        <Notecard />
        <Notecard />
        <Notecard />
        <Notecard />
        <Notecard />
      </div>
      <div className="mt-auto w-full bg-bg3 border-2 border-border rounded-b-2xl">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default PinnedNotesBoard;
