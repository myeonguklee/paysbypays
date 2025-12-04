'use client';

import { useState } from 'react';

interface PaymentsSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onFilterChange: () => void;
}

export const PaymentsSearch = ({
  searchQuery,
  onSearchChange,
  onFilterChange,
}: PaymentsSearchProps) => {
  const [localQuery, setLocalQuery] = useState(searchQuery);

  const handleSearch = () => {
    onSearchChange(localQuery);
    onFilterChange();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleClear = () => {
    setLocalQuery('');
    onSearchChange('');
    onFilterChange();
  };

  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
      <div className="relative flex-1">
        <input
          type="text"
          value={localQuery}
          onChange={(e) => setLocalQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="거래코드, 가맹점명으로 검색..."
          className="w-full rounded-md border border-gray-300 px-4 py-2 pr-10 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
          aria-label="거래 내역 검색"
        />
        {localQuery && (
          <button
            onClick={handleClear}
            className="absolute top-1/2 right-2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            aria-label="검색어 지우기"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleClear();
              }
            }}
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
      <button
        onClick={handleSearch}
        className="rounded-md bg-[#0064FF] px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
        aria-label="검색"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            handleSearch();
          }
        }}
      >
        검색
      </button>
    </div>
  );
};
