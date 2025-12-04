'use client';

import { Download } from 'lucide-react';
import { Pagination } from '@/components/Pagination';
import { usePaymentsData } from '@/hooks/payments/usePaymentsData';
import { usePaymentsFilters } from '@/hooks/payments/usePaymentsFilters';
import { usePagination } from '@/hooks/usePagination';
import {
  useGetPaymentStatusQuery,
  useGetPaymentTypeQuery,
} from '@/api/common/queries';
import { useGetMerchantsListQuery } from '@/api/merchants/queries';
import { useGetPaymentsListQuery } from '@/api/payments/queries';
import { ITEMS_PER_PAGE_OPTIONS } from '@/constants/payments';
import { exportPaymentsToExcel } from '@/utils/payments/exportToExcel';
import { SortField } from '@/utils/payments/sortPayments';
import { PaymentsFilters } from './PaymentsFilters';
import { PaymentsSearch } from './PaymentsSearch';
import { PaymentsTable } from './PaymentsTable';

export default function PaymentsPageContent() {
  const { data: payments = [] } = useGetPaymentsListQuery();
  const { data: merchants = [] } = useGetMerchantsListQuery();
  const { data: paymentStatusMap = {} } = useGetPaymentStatusQuery();
  const { data: paymentTypeMap = {} } = useGetPaymentTypeQuery();

  // 필터 상태 관리 (URL 동기화 포함)
  const {
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    payTypeFilter,
    setPayTypeFilter,
    mchtCodeFilter,
    setMchtCodeFilter,
    currencyFilter,
    setCurrencyFilter,
    sortField,
    setSortField,
    sortOrder,
    setSortOrder,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,
  } = usePaymentsFilters();

  // 데이터 처리 (변환, 필터링, 정렬)
  const { processedData, currencies } = usePaymentsData({
    payments,
    merchants,
    paymentStatusMap,
    paymentTypeMap,
    filters: {
      searchQuery,
      statusFilter,
      payTypeFilter,
      mchtCodeFilter,
      currencyFilter,
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
      setSortOrder('desc');
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

  const handleExportToExcel = () => {
    exportPaymentsToExcel(processedData, '거래내역');
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">거래 내역</h1>
        <button
          type="button"
          onClick={handleExportToExcel}
          className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
          aria-label="Excel 다운로드"
        >
          <Download className="h-4 w-4" />
          Excel 다운로드
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {/* 검색 및 필터 */}
        <div className="flex flex-col gap-4 rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
          <PaymentsSearch
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
            onFilterChange={handleFilterChange}
          />
          <PaymentsFilters
            statusFilter={statusFilter}
            payTypeFilter={payTypeFilter}
            mchtCodeFilter={mchtCodeFilter}
            currencyFilter={currencyFilter}
            merchants={merchants}
            currencies={currencies}
            onStatusFilterChange={(value) => {
              setStatusFilter(value);
              handleFilterChange();
            }}
            onPayTypeFilterChange={(value) => {
              setPayTypeFilter(value);
              handleFilterChange();
            }}
            onMchtCodeFilterChange={(value) => {
              setMchtCodeFilter(value);
              handleFilterChange();
            }}
            onCurrencyFilterChange={(value) => {
              setCurrencyFilter(value);
              handleFilterChange();
            }}
          />
        </div>

        {/* 테이블 */}
        <PaymentsTable
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
    </div>
  );
}
