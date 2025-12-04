'use client';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  totalItems: number;
  itemsPerPageOptions: readonly number[];
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (value: number) => void;
}

export const Pagination = ({
  currentPage,
  totalPages,
  itemsPerPage,
  totalItems,
  itemsPerPageOptions,
  onPageChange,
  onItemsPerPageChange,
}: PaginationProps) => {
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, action: () => void) => {
    if (e.key === 'Enter' || e.key === ' ') {
      action();
    }
  };

  // 페이지 번호 생성 (최대 5개)
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="flex flex-col gap-4 px-2 sm:flex-row sm:items-center sm:justify-between">
      {/* 페이지당 항목 수 선택 */}
      <div className="flex items-center gap-2">
        <label className="text-sm text-gray-700">페이지당 표시:</label>
        <select
          value={itemsPerPage}
          onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
          className="rounded-md border border-gray-300 px-2 py-1 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
          aria-label="페이지당 항목 수 선택"
        >
          {itemsPerPageOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <span className="text-sm text-gray-500">
          (총 {totalItems.toLocaleString()}건)
        </span>
      </div>

      {/* 페이지네이션 */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-700">
          {startItem.toLocaleString()} - {endItem.toLocaleString()} /{' '}
          {totalItems.toLocaleString()}
        </span>

        <div className="flex items-center gap-1">
          <button
            onClick={handlePrevious}
            disabled={currentPage === 1}
            aria-label="이전 페이지"
            className="rounded-md border border-gray-300 bg-white px-3 py-1 text-sm hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            tabIndex={currentPage === 1 ? -1 : 0}
            onKeyDown={(e) => handleKeyDown(e, handlePrevious)}
          >
            이전
          </button>

          <div className="flex items-center gap-1">
            {getPageNumbers().map((page, index) => {
              if (page === '...') {
                return (
                  <span
                    key={`ellipsis-${index}`}
                    className="px-2 text-sm text-gray-400"
                  >
                    ...
                  </span>
                );
              }

              const pageNum = page as number;
              const isActive = pageNum === currentPage;

              return (
                <button
                  key={pageNum}
                  onClick={() => onPageChange(pageNum)}
                  aria-label={`${pageNum}페이지로 이동`}
                  className={`rounded-md px-3 py-1 text-sm ${
                    isActive
                      ? 'bg-[#0064FF] text-white'
                      : 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      onPageChange(pageNum);
                    }
                  }}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>

          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            aria-label="다음 페이지"
            className="rounded-md border border-gray-300 bg-white px-3 py-1 text-sm hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            tabIndex={currentPage === totalPages ? -1 : 0}
            onKeyDown={(e) => handleKeyDown(e, handleNext)}
          >
            다음
          </button>
        </div>
      </div>
    </div>
  );
};
