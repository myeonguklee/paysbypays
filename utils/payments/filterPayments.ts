import { PaymentStatus, PaymentType } from '@/api/type';
import { ProcessedPayment } from './transformPaymentData';

export interface PaymentFilters {
  searchQuery: string;
  statusFilter: PaymentStatus | 'ALL';
  payTypeFilter: PaymentType | 'ALL';
  mchtCodeFilter: string;
  currencyFilter: string;
}

/**
 * 결제 데이터 필터링
 */
export const filterPayments = (
  payments: ProcessedPayment[],
  filters: PaymentFilters
): ProcessedPayment[] => {
  return payments.filter((p) => {
    // 검색 필터
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      const matchesSearch =
        p.paymentCode.toLowerCase().includes(query) ||
        p.mchtName.toLowerCase().includes(query) ||
        p.mchtCode.toLowerCase().includes(query);
      if (!matchesSearch) return false;
    }

    // 상태 필터
    if (filters.statusFilter !== 'ALL' && p.status !== filters.statusFilter) {
      return false;
    }

    // 결제수단 필터
    if (
      filters.payTypeFilter !== 'ALL' &&
      p.payType !== filters.payTypeFilter
    ) {
      return false;
    }

    // 가맹점 필터
    if (
      filters.mchtCodeFilter !== 'ALL' &&
      p.mchtCode !== filters.mchtCodeFilter
    ) {
      return false;
    }

    // 통화 필터
    if (
      filters.currencyFilter !== 'ALL' &&
      p.currency !== filters.currencyFilter
    ) {
      return false;
    }

    return true;
  });
};
