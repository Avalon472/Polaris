import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface ItemPaginationProps {
  currentPage: number;
  maxPages: number;
  onSelect: (page: number) => void;
}

const ItemPagination = ({
  currentPage,
  maxPages,
  onSelect,
}: ItemPaginationProps) => {
  const handleChange = (pageNum: number) => {
    const newPage = Math.min(Math.max(pageNum, 1), maxPages);
    onSelect(newPage);
  };

  return (
    <Pagination>
      <PaginationContent>
        {maxPages > 1 && (
          <PaginationItem>
            <PaginationPrevious onClick={() => handleChange(currentPage - 1)} />
          </PaginationItem>
        )}
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationLink onClick={() => handleChange(1)}>1</PaginationLink>
          </PaginationItem>
        )}
        {currentPage - 1 > 1 && <PaginationEllipsis />}
        <PaginationItem>
          <PaginationLink isActive>{currentPage}</PaginationLink>
        </PaginationItem>
        {currentPage + 1 < maxPages && <PaginationEllipsis />}
        {currentPage < maxPages && (
          <PaginationItem>
            <PaginationLink
              onClick={() => handleChange(maxPages)}
              isActive={currentPage === maxPages}
            >
              {maxPages}
            </PaginationLink>
          </PaginationItem>
        )}

        {maxPages > 1 && (
          <PaginationItem>
            <PaginationNext onClick={() => handleChange(currentPage + 1)} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};

export default ItemPagination;
