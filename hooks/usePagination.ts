import { useMemo } from 'react';

interface UsePaginationParams {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
}

export const usePagination = ({
  totalItems,
  itemsPerPage,
  currentPage,
}: UsePaginationParams) => {
  const totalPages = useMemo(() => {
    return Math.ceil(totalItems / itemsPerPage);
  }, [totalItems, itemsPerPage]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return { startIndex, endIndex };
  }, [currentPage, itemsPerPage]);

  return {
    totalPages,
    startIndex: paginatedData.startIndex,
    endIndex: paginatedData.endIndex,
  };
};
