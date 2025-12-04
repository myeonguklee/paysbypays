import { useMemo } from 'react';
import { Merchant } from '@/api/merchants/type';
import {
  MerchantFilters,
  filterMerchants,
} from '@/utils/merchants/filterMerchants';
import {
  SortField,
  SortOrder,
  sortMerchants,
} from '@/utils/merchants/sortMerchants';

interface UseMerchantsDataParams {
  merchants: Merchant[];
  filters: MerchantFilters;
  sortField: SortField;
  sortOrder: SortOrder;
}

export const useMerchantsData = ({
  merchants,
  filters,
  sortField,
  sortOrder,
}: UseMerchantsDataParams) => {
  // 데이터 필터링 및 정렬
  const processedData = useMemo(() => {
    // 1. 필터링
    const filtered = filterMerchants(merchants, filters);

    // 2. 정렬
    const sorted = sortMerchants(filtered, sortField, sortOrder);

    return sorted;
  }, [merchants, filters, sortField, sortOrder]);

  // 업종 목록 추출
  const bizTypes = useMemo(() => {
    const uniqueBizTypes = new Set(merchants.map((m) => m.bizType));
    return Array.from(uniqueBizTypes).sort();
  }, [merchants]);

  return {
    processedData,
    bizTypes,
  };
};
