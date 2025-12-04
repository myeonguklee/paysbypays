import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { MerchantStatus } from '@/api/type';
import {
  DEFAULT_ITEMS_PER_PAGE,
  DEFAULT_SORT_FIELD,
  DEFAULT_SORT_ORDER,
} from '@/constants/merchants';
import { SortField, SortOrder } from '@/utils/merchants/sortMerchants';
import {
  buildQueryParams,
  parseNumberParam,
  parseQueryParam,
} from '@/utils/url/queryParams';

export interface MerchantsFiltersState {
  searchQuery: string;
  statusFilter: MerchantStatus | 'ALL';
  bizTypeFilter: string;
  mchtCodeFilter: string;
  sortField: SortField;
  sortOrder: SortOrder;
  currentPage: number;
  itemsPerPage: number;
}

export const useMerchantsFilters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // URL에서 초기 상태 읽기
  const [searchQuery, setSearchQuery] = useState(() =>
    parseQueryParam(searchParams.get('search'), '')
  );
  const [statusFilter, setStatusFilter] = useState<MerchantStatus | 'ALL'>(
    () =>
      parseQueryParam(searchParams.get('status'), 'ALL') as
        | MerchantStatus
        | 'ALL'
  );
  const [bizTypeFilter, setBizTypeFilter] = useState<string>(() =>
    parseQueryParam(searchParams.get('bizType'), 'ALL')
  );
  const [mchtCodeFilter, setMchtCodeFilter] = useState<string>(() =>
    parseQueryParam(searchParams.get('mchtCode'), 'ALL')
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
    if (bizTypeFilter !== 'ALL') params.bizType = bizTypeFilter;
    if (mchtCodeFilter !== 'ALL') params.mchtCode = mchtCodeFilter;
    if (sortField !== DEFAULT_SORT_FIELD) params.sort = sortField;
    if (sortOrder !== DEFAULT_SORT_ORDER) params.order = sortOrder;
    if (currentPage !== 1) params.page = currentPage;
    if (itemsPerPage !== DEFAULT_ITEMS_PER_PAGE) params.limit = itemsPerPage;

    const queryString = buildQueryParams(params);
    const newURL = queryString ? `/merchants?${queryString}` : '/merchants';

    router.replace(newURL);
  }, [
    router,
    searchQuery,
    statusFilter,
    bizTypeFilter,
    mchtCodeFilter,
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
  };
};
