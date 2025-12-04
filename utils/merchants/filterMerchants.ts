import { Merchant } from '@/api/merchants/type';
import { MerchantStatus } from '@/api/type';

export interface MerchantFilters {
  searchQuery: string;
  statusFilter: MerchantStatus | 'ALL';
  bizTypeFilter: string;
  mchtCodeFilter: string;
}

/**
 * 가맹점 데이터 필터링
 */
export const filterMerchants = (
  merchants: Merchant[],
  filters: MerchantFilters
): Merchant[] => {
  return merchants.filter((m) => {
    // 검색 필터
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      const matchesSearch =
        m.mchtCode.toLowerCase().includes(query) ||
        m.mchtName.toLowerCase().includes(query);
      if (!matchesSearch) return false;
    }

    // 상태 필터
    if (filters.statusFilter !== 'ALL' && m.status !== filters.statusFilter) {
      return false;
    }

    // 업종 필터
    if (
      filters.bizTypeFilter !== 'ALL' &&
      m.bizType !== filters.bizTypeFilter
    ) {
      return false;
    }

    // 가맹점 필터
    if (
      filters.mchtCodeFilter !== 'ALL' &&
      m.mchtCode !== filters.mchtCodeFilter
    ) {
      return false;
    }

    return true;
  });
};
