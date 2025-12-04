import { useMemo } from 'react';
import { Merchant } from '@/api/merchants/type';
import { Payment } from '@/api/payments/type';
import { PaymentStatus, PaymentType } from '@/api/type';
import {
  PaymentFilters,
  filterPayments,
} from '@/utils/payments/filterPayments';
import {
  SortField,
  SortOrder,
  sortPayments,
} from '@/utils/payments/sortPayments';
import {
  createMerchantMap,
  transformPaymentsData,
} from '@/utils/payments/transformPaymentData';

interface UsePaymentsDataParams {
  payments: Payment[];
  merchants: Merchant[];
  paymentStatusMap: Record<PaymentStatus, string>;
  paymentTypeMap: Record<PaymentType, string>;
  filters: PaymentFilters;
  sortField: SortField;
  sortOrder: SortOrder;
}

export const usePaymentsData = ({
  payments,
  merchants,
  paymentStatusMap,
  paymentTypeMap,
  filters,
  sortField,
  sortOrder,
}: UsePaymentsDataParams) => {
  // 가맹점 맵 생성
  const merchantMap = useMemo(() => {
    return createMerchantMap(merchants);
  }, [merchants]);

  // 데이터 변환, 필터링, 정렬
  const processedData = useMemo(() => {
    // 1. 데이터 변환
    const transformed = transformPaymentsData(
      payments,
      merchantMap,
      paymentStatusMap,
      paymentTypeMap
    );

    // 2. 필터링
    const filtered = filterPayments(transformed, filters);

    // 3. 정렬
    const sorted = sortPayments(filtered, sortField, sortOrder);

    return sorted;
  }, [
    payments,
    merchantMap,
    paymentStatusMap,
    paymentTypeMap,
    filters,
    sortField,
    sortOrder,
  ]);

  // 통화 목록 추출
  const currencies = useMemo(() => {
    const uniqueCurrencies = new Set(payments.map((p) => p.currency));
    return Array.from(uniqueCurrencies).sort();
  }, [payments]);

  return {
    processedData,
    currencies,
  };
};
