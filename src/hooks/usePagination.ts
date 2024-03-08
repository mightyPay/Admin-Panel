import { useState, useCallback } from "react";

interface UsePaginationResult {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  goToNextPage: () => void;
  goToPrevPage: () => void;
  pageNumbers: (number | "..." | string)[];
  activeDot: number;
  handleDotClick: (index: number) => void;
  maxPage: number;
}

function usePagination(
  totalItems: number,
  itemsPerPage = 10,
  dotsToShow = 5
): UsePaginationResult {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeDot, setActiveDot] = useState(1);

  const pageNumbers = Array.from(
    Array(Math.ceil(totalItems / itemsPerPage)),
    (_, i) => i + 1
  );

  const maxPage = pageNumbers.length;

  const goToNextPage = useCallback(() => {
    setCurrentPage(Math.min(currentPage + 1, maxPage));
    setActiveDot(Math.min(activeDot + 1, maxPage));
  }, [currentPage, activeDot, maxPage]);

  const goToPrevPage = useCallback(() => {
    setCurrentPage(Math.max(currentPage - 1, 1));
    setActiveDot(Math.max(activeDot - 1, 1));
  }, [currentPage, activeDot]);

  const handleDotClick = useCallback((index: number) => {
    console.log({ index });
    setCurrentPage(index);
    setActiveDot(index);
  }, []);

  const startIndex = Math.max(1, currentPage - 2);
  const endIndex = Math.min(maxPage, currentPage + dotsToShow - 2);
  const pageNumbersWithDots = [];

  if (startIndex > 1) {
    pageNumbersWithDots.push(1);
    pageNumbersWithDots.push("...");
  }

  for (let i = startIndex; i <= endIndex; i++) {
    pageNumbersWithDots.push(i);
  }

  if (endIndex < maxPage) {
    pageNumbersWithDots.push("...");
    pageNumbersWithDots.push(maxPage);
  }

  return {
    currentPage,
    itemsPerPage,
    totalItems,
    goToNextPage,
    goToPrevPage,
    pageNumbers: pageNumbersWithDots,
    activeDot,
    handleDotClick,
    maxPage,
  };
}

export default usePagination;
