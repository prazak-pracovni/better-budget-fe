import PaginationItem from '@/components/ui/pagination/PaginationItem';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

interface Props {
  itemCount: number;
  pageSize: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<Props> = ({ itemCount, pageSize, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(itemCount / pageSize);
  return (
    <ol className="flex justify-center gap-2 text-sm font-medium">
      <PaginationItem onPageChange={() => currentPage > 1 && onPageChange(currentPage - 1)}>
        <span className="sr-only">Prev Page</span>
        <ChevronLeftIcon className="w-4 h-4"></ChevronLeftIcon>
      </PaginationItem>
      {Array.from({ length: totalPages }).map((_, index) => (
        <PaginationItem key={index} onPageChange={() => onPageChange(index + 1)} isSelected={currentPage === index + 1}>
          {index + 1}
        </PaginationItem>
      ))}
      <PaginationItem onPageChange={() => currentPage < totalPages && onPageChange(currentPage + 1)}>
        <span className="sr-only">Next Page</span>
        <ChevronRightIcon className="w-4 h-4"></ChevronRightIcon>
      </PaginationItem>
    </ol>
  );
};

export default Pagination;
