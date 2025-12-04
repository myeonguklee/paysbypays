'use client';

import { useState } from 'react';
import { Download, PlusIcon } from 'lucide-react';
import { Pagination } from '@/components/Pagination';
import { useMerchantsData } from '@/hooks/merchants/useMerchantsData';
import { useMerchantsFilters } from '@/hooks/merchants/useMerchantsFilters';
import { usePagination } from '@/hooks/usePagination';
import { useGetMerchantStatusQuery } from '@/api/common/queries';
import { useGetMerchantsListQuery } from '@/api/merchants/queries';
import { ITEMS_PER_PAGE_OPTIONS } from '@/constants/merchants';
import { exportMerchantsToExcel } from '@/utils/merchants/exportToExcel';
import { SortField } from '@/utils/merchants/sortMerchants';
import { MerchantCreateModal } from './MerchantCreateModal';
import { MerchantsFilters } from './MerchantsFilters';
import { MerchantsSearch } from './MerchantsSearch';
import { MerchantsTable } from './MerchantsTable';

export default function MerchantsPageContent() {
  const { data: merchants = [] } = useGetMerchantsListQuery();
  const { data: merchantStatusMap = {} } = useGetMerchantStatusQuery();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // 필터 상태 관리 (URL 동기화 포함)
  const {
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    bizTypeFilter,
    setBizTypeFilter,
    mchtCodeFilter,
    setMchtCodeFilter,
    sortField,
    setSortField,
    sortOrder,
    setSortOrder,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,
  } = useMerchantsFilters();

  // 데이터 처리 (필터링, 정렬)
  const { processedData, bizTypes } = useMerchantsData({
    merchants,
    filters: {
      searchQuery,
      statusFilter,
      bizTypeFilter,
      mchtCodeFilter,
    },
    sortField,
    sortOrder,
  });

  const { totalPages, startIndex, endIndex } = usePagination({
    totalItems: processedData.length,
    itemsPerPage,
    currentPage,
  });

  const paginatedData = processedData.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleItemsPerPageChange = (value: number) => {
    setItemsPerPage(value);
    setCurrentPage(1);
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
    setCurrentPage(1);
  };

  const handleFilterChange = () => {
    setCurrentPage(1);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    handleFilterChange();
  };

  const handleAddMerchant = () => {
    setIsCreateModalOpen(true);
  };

  const handleCloseCreateModal = () => {
    setIsCreateModalOpen(false);
  };

  const handleExportToExcel = () => {
    exportMerchantsToExcel(processedData, merchantStatusMap, '가맹점목록');
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">가맹점 관리</h1>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleAddMerchant}
            className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none sm:text-sm"
            aria-label="가맹점 추가"
          >
            <PlusIcon className="size-4" />
            가맹점 추가
          </button>
          <button
            type="button"
            onClick={handleExportToExcel}
            className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none sm:text-sm"
            aria-label="Excel 다운로드"
          >
            <Download className="size-4" />
            Excel 다운로드
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {/* 검색 및 필터 */}
        <div className="flex flex-col gap-4 rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
          <MerchantsSearch
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
            onFilterChange={handleFilterChange}
          />
          <MerchantsFilters
            statusFilter={statusFilter}
            bizTypeFilter={bizTypeFilter}
            mchtCodeFilter={mchtCodeFilter}
            bizTypes={bizTypes}
            merchants={merchants}
            onStatusFilterChange={(value) => {
              setStatusFilter(value);
              handleFilterChange();
            }}
            onBizTypeFilterChange={(value) => {
              setBizTypeFilter(value);
              handleFilterChange();
            }}
            onMchtCodeFilterChange={(value) => {
              setMchtCodeFilter(value);
              handleFilterChange();
            }}
          />
        </div>

        {/* 테이블 */}
        <MerchantsTable
          data={paginatedData}
          sortField={sortField}
          sortOrder={sortOrder}
          onSort={handleSort}
        />

        {/* 페이지네이션 및 설정 */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          itemsPerPage={itemsPerPage}
          totalItems={processedData.length}
          itemsPerPageOptions={ITEMS_PER_PAGE_OPTIONS}
          onPageChange={handlePageChange}
          onItemsPerPageChange={handleItemsPerPageChange}
        />
      </div>

      {/* 가맹점 추가 모달 */}
      <MerchantCreateModal
        isOpen={isCreateModalOpen}
        onClose={handleCloseCreateModal}
      />
    </div>
  );
}
