import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { PaymentStatus, PaymentType } from '@/api/type';
import {
  DEFAULT_ITEMS_PER_PAGE,
  DEFAULT_SORT_FIELD,
  DEFAULT_SORT_ORDER,
} from '@/constants/payments';
import { SortField, SortOrder } from '@/utils/payments/sortPayments';
import {
  buildQueryParams,
  parseNumberParam,
  parseQueryParam,
} from '@/utils/url/queryParams';

export interface PaymentsFiltersState {
  searchQuery: string;
  statusFilter: PaymentStatus | 'ALL';
  payTypeFilter: PaymentType | 'ALL';
  mchtCodeFilter: string;
  currencyFilter: string;
  sortField: SortField;
  sortOrder: SortOrder;
  currentPage: number;
  itemsPerPage: number;
}

export const usePaymentsFilters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // URL에서 초기 상태 읽기
  const [searchQuery, setSearchQuery] = useState(() =>
    parseQueryParam(searchParams.get('search'), '')
  );
  const [statusFilter, setStatusFilter] = useState<PaymentStatus | 'ALL'>(
    () =>
      parseQueryParam(searchParams.get('status'), 'ALL') as
        | PaymentStatus
        | 'ALL'
  );
  const [payTypeFilter, setPayTypeFilter] = useState<PaymentType | 'ALL'>(
    () =>
      parseQueryParam(searchParams.get('payType'), 'ALL') as PaymentType | 'ALL'
  );
  const [mchtCodeFilter, setMchtCodeFilter] = useState<string>(() =>
    parseQueryParam(searchParams.get('mchtCode'), 'ALL')
  );
  const [currencyFilter, setCurrencyFilter] = useState<string>(() =>
    parseQueryParam(searchParams.get('currency'), 'ALL')
  );
  const [sortField, setSortField] = useState<SortField>(
    () =>
      parseQueryParam(searchParams.get('sort'), DEFAULT_SORT_FIELD) as SortField
  );
  const [sortOrder, setSortOrder] = useState<SortOrder>(
    () =>
      parseQueryParam(
        searchParams.get('order'),
        DEFAULT_SORT_ORDER
      ) as SortOrder
  );
  const [currentPage, setCurrentPage] = useState(() =>
    parseNumberParam(searchParams.get('page'), 1)
  );
  const [itemsPerPage, setItemsPerPage] = useState(() =>
    parseNumberParam(searchParams.get('limit'), DEFAULT_ITEMS_PER_PAGE)
  );

  // 상태 변경 시 URL 업데이트
  useEffect(() => {
    const params: Record<string, string | number> = {};

    // 기본값이 아닌 경우만 URL에 추가
    if (searchQuery) params.search = searchQuery;
    if (statusFilter !== 'ALL') params.status = statusFilter;
    if (payTypeFilter !== 'ALL') params.payType = payTypeFilter;
    if (mchtCodeFilter !== 'ALL') params.mchtCode = mchtCodeFilter;
    if (currencyFilter !== 'ALL') params.currency = currencyFilter;
    if (sortField !== DEFAULT_SORT_FIELD) params.sort = sortField;
    if (sortOrder !== DEFAULT_SORT_ORDER) params.order = sortOrder;
    if (currentPage !== 1) params.page = currentPage;
    if (itemsPerPage !== DEFAULT_ITEMS_PER_PAGE) params.limit = itemsPerPage;

    const queryString = buildQueryParams(params);
    const newURL = queryString ? `/payments?${queryString}` : '/payments';

    router.replace(newURL);
  }, [
    router,
    searchQuery,
    statusFilter,
    payTypeFilter,
    mchtCodeFilter,
    currencyFilter,
    sortField,
    sortOrder,
    currentPage,
    itemsPerPage,
  ]);

  return {
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
  };
};
