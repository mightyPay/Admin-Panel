import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";
import React, { useEffect } from "react";
import usePagination from "../../hooks/usePagination";
import clsxm from "../../utils/clsxm";

interface Props {
  totalItems: number;
  itemsPerPage?: number;
  dotsToShow?: number;
  onPageChange?: (page: number) => void;
}

const Pagination: React.FC<Props> = ({
  totalItems,
  onPageChange,
  itemsPerPage = 10,
  dotsToShow = 5,
}) => {
  const {
    currentPage,
    pageNumbers,
    goToNextPage,
    goToPrevPage,
    handleDotClick,
    activeDot,
    maxPage,
  } = usePagination(totalItems, itemsPerPage, dotsToShow);

  useEffect(() => {
    if (activeDot) {
      onPageChange && onPageChange(activeDot as number);
    }
  }, [activeDot]);

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex items-center gap-x-4">
        <button
          onClick={goToPrevPage}
          disabled={currentPage === 1}
          className="relative inline-flex cursor-pointer items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
        >
          <span className="sr-only">Previous</span>
          <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
        </button>

        {pageNumbers.map((number, index) => (
          <span
            key={index}
            onClick={() => {
              if (number !== "...") handleDotClick(number as number);
            }}
            className={clsxm(
              "px-4 rounded-md py-2  cursor-pointer",
              currentPage === number
                ? ["bg-rose-800 text-white"]
                : ["hover:bg-gray-100"]
            )}
          >
            {number}
          </span>
        ))}

        <button
          onClick={goToNextPage}
          disabled={currentPage === maxPage}
          className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
        >
          <span className="sr-only">Next</span>
          <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
