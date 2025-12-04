'use client';

import {
  useGetPaymentStatusQuery,
  useGetPaymentTypeQuery,
} from '@/api/common/queries';
import { Merchant } from '@/api/merchants/type';
import { PaymentStatus, PaymentType } from '@/api/type';

interface PaymentsFiltersProps {
  statusFilter: PaymentStatus | 'ALL';
  payTypeFilter: PaymentType | 'ALL';
  mchtCodeFilter: string;
  currencyFilter: string;
  merchants: Merchant[];
  currencies: string[];
  onStatusFilterChange: (value: PaymentStatus | 'ALL') => void;
  onPayTypeFilterChange: (value: PaymentType | 'ALL') => void;
  onMchtCodeFilterChange: (value: string) => void;
  onCurrencyFilterChange: (value: string) => void;
}

export const PaymentsFilters = ({
  statusFilter,
  payTypeFilter,
  mchtCodeFilter,
  currencyFilter,
  merchants,
  currencies,
  onStatusFilterChange,
  onPayTypeFilterChange,
  onMchtCodeFilterChange,
  onCurrencyFilterChange,
}: PaymentsFiltersProps) => {
  const { data: paymentStatusMap = {} } = useGetPaymentStatusQuery();
  const { data: paymentTypeMap = {} } = useGetPaymentTypeQuery();

  const statusOptions: Array<{ value: PaymentStatus | 'ALL'; label: string }> =
    [
      { value: 'ALL', label: '전체' },
      { value: 'SUCCESS', label: paymentStatusMap.SUCCESS || '결제 완료' },
      { value: 'FAILED', label: paymentStatusMap.FAILED || '결제 실패' },
      { value: 'CANCELLED', label: paymentStatusMap.CANCELLED || '환불 완료' },
      { value: 'PENDING', label: paymentStatusMap.PENDING || '결제 대기' },
    ];

  const payTypeOptions: Array<{ value: PaymentType | 'ALL'; label: string }> = [
    { value: 'ALL', label: '전체' },
    { value: 'ONLINE', label: paymentTypeMap.ONLINE || '온라인' },
    { value: 'DEVICE', label: paymentTypeMap.DEVICE || '단말기' },
    { value: 'MOBILE', label: paymentTypeMap.MOBILE || '모바일' },
    { value: 'VACT', label: paymentTypeMap.VACT || '가상계좌' },
    { value: 'BILLING', label: paymentTypeMap.BILLING || '정기결제' },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {/* 상태 필터 */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-gray-700">결제 상태</label>
        <select
          value={statusFilter}
          onChange={(e) =>
            onStatusFilterChange(e.target.value as PaymentStatus | 'ALL')
          }
          className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
          aria-label="결제 상태 필터"
        >
          {statusOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* 결제수단 필터 */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-gray-700">결제수단</label>
        <select
          value={payTypeFilter}
          onChange={(e) =>
            onPayTypeFilterChange(e.target.value as PaymentType | 'ALL')
          }
          className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
          aria-label="결제수단 필터"
        >
          {payTypeOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* 가맹점 필터 */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-gray-700">가맹점</label>
        <select
          value={mchtCodeFilter}
          onChange={(e) => onMchtCodeFilterChange(e.target.value)}
          className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
          aria-label="가맹점 필터"
        >
          <option value="ALL">전체</option>
          {merchants.map((merchant) => (
            <option key={merchant.mchtCode} value={merchant.mchtCode}>
              {merchant.mchtName}
            </option>
          ))}
        </select>
      </div>

      {/* 통화 필터 */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-gray-700">통화</label>
        <select
          value={currencyFilter}
          onChange={(e) => onCurrencyFilterChange(e.target.value)}
          className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
          aria-label="통화 필터"
        >
          <option value="ALL">전체</option>
          {currencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
